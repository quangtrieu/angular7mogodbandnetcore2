using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Framework.SecurityServices.BCrypt;
using VNC.Framework.Utilities;
using VNC.Infrastructure.Interfaces;

namespace VNC.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IMongoDBContext _context;
        public UserRepository(IMongoDBContext context)
        {
            _context = context;
        }
        public async Task CreateUser(DataTransformationUser dataTransformationUser)
        {
            User user = new User();
            user.UserName = dataTransformationUser.UserName;
            user.Password = SecurityBCryptMethod.CreatePasswordHash(dataTransformationUser.Password);
            user.EmailAddress = dataTransformationUser.EmailAddress;
            user.ExpiresIn = dataTransformationUser.ExpiresIn;
            user.IPAddress = dataTransformationUser.IPAddress;
            user.Gender = dataTransformationUser.Gender;
            user.InExuer = dataTransformationUser.InExuer;
            user.LimitedTotal = dataTransformationUser.LimitedTotal;
            user.CreatedDate = DateTime.Now;
            user.CreatedBy = "";
            user.Deleted = false;

            user.RoleDetails = new List<UserDetail>();

            foreach(DetailDataTransformationUserRole detailDataTransformationUserRole in dataTransformationUser.RoleDetails)
            {
                UserDetail userDetail = new UserDetail();
                userDetail.Id = new ObjectId(detailDataTransformationUserRole.id);
                userDetail.Name = detailDataTransformationUserRole.Name;
                user.RoleDetails.Add(userDetail);
            }
            await _context.Users.InsertOneAsync(user);
        }

        public async Task Create(User user)
        {
            await _context.Users.InsertOneAsync(user);
        }

        public async Task<bool> Delete(string id)
        {
            ObjectId objectIdentifier = new ObjectId(id);

            FilterDefinition<User> filter = Builders<User>.Filter.Eq(m => m.Id, objectIdentifier);

            DeleteResult deleteResult = await _context
                                                .Users
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }

        public async Task<IEnumerable<User>> GetAllUser()
        {
            return await _context
                            .Users
                            .Find(_ => true)
                            .ToListAsync();
        }

        public User GetUserId(string id)
        {
            ObjectId objectIdentifier = new ObjectId(id);

            FilterDefinition<User> filter = Builders<User>.Filter.Eq(m => m.Id, objectIdentifier);

            return _context
                    .Users
                    .Find(filter)
                    .FirstOrDefault();
        }


        public async Task<User> GetUserById(string id)
        {
            ObjectId objectIdentifier = new ObjectId(id);

            FilterDefinition<User> filter = Builders<User>.Filter.Eq(m => m.Id, objectIdentifier);

            return await _context
                    .Users
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }

        public async Task<User> GetUserByName(string username)
        {

            var builder = Builders<User>.Filter;
            var filter = builder.Eq("UserName", username);

            return await _context.Users
                        .Find(filter)
                        .FirstOrDefaultAsync();
        }

        public async Task<bool> Update(User user)
        {
            ReplaceOneResult updateResult =
               await _context
                       .Users
                       .ReplaceOneAsync(
                           filter: g => g.Id == user.Id,
                           replacement: user);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }

        /// <summary>
		/// Get All Users
		/// </summary>
		/// <param name="currentPageNumber"></param>
		/// <param name="pageSize"></param>
		/// <param name="sortExpression"></param>
		/// <param name="sortDirection"></param>
		/// <returns></returns>
		public async Task<ResponseModel<List<UserDataTransformation>>> GetAllUsers(string userName, string emailAddress, int currentPageNumber, int pageSize, string sortExpression, string sortDirection)
        {

            ResponseModel<List<UserDataTransformation>> returnResponse = new ResponseModel<List<UserDataTransformation>>();

            List<UserDataTransformation> users = new List<UserDataTransformation>();

            try
            {
                DataGridPagingInformation dataGridPagingInformation = new DataGridPagingInformation();
                dataGridPagingInformation.CurrentPageNumber = currentPageNumber;
                dataGridPagingInformation.PageSize = pageSize;
                dataGridPagingInformation.SortDirection = sortDirection;
                dataGridPagingInformation.SortExpression = sortExpression;

                List<User> userList = await UserListPaging(userName, emailAddress, dataGridPagingInformation);
                foreach (User user in userList)
                {
                    UserDataTransformation userDataTransformation = new UserDataTransformation();
                    userDataTransformation.id = Convert.ToString(user.Id);
                    userDataTransformation.UserName = user.UserName;
                    userDataTransformation.EmailAddress = user.EmailAddress;
                    userDataTransformation.IPAddress = user.IPAddress;
                    userDataTransformation.LimitedTotal = user.LimitedTotal;

                    users.Add(userDataTransformation);
                }

                returnResponse.Entity = users;
                returnResponse.TotalRows = dataGridPagingInformation.TotalRows;
                returnResponse.TotalPages = dataGridPagingInformation.TotalPages;

                returnResponse.ReturnStatus = true;

            }
            catch (Exception ex)
            {
                returnResponse.ReturnStatus = false;
                returnResponse.ReturnMessage.Add(ex.Message);
            }
            finally
            {
            }

            return returnResponse;

        }

        /// <summary>
		/// User Inquiry
		/// </summary>
		/// <param name="userName"></param>
		/// <param name="emailAddress"></param>
		/// <param name="paging"></param>
		/// <returns></returns>
		public async Task<List<User>> UserListPaging(string userName, string emailAddress, DataGridPagingInformation paging)
        {
            string sortExpression = paging.SortExpression;
            string sortDirection = paging.SortDirection;

            int sortOrder = 1;
            if (sortDirection == "desc")
            {
                sortOrder = -1;
            }

            if (paging.CurrentPageNumber > 0)
            {
                paging.CurrentPageNumber = paging.CurrentPageNumber - 1;
            }

            if (string.IsNullOrEmpty(sortExpression))
            {
                sortExpression = "{Description: 1}";
            }
            else
            {
                sortExpression = "{" + sortExpression + ": " + sortOrder + "}";
            }

            if (paging.PageSize == 0)
            {
                paging.PageSize = 20;
            }

            //
            //	initialize filter
            //
            FilterDefinition<User> filter = Builders<User>.Filter.Empty;

            userName = userName.Trim();
            emailAddress = emailAddress.Trim();

            //
            //	filter by user name
            //
            if (userName.Length > 0)
            {
                filter = filter & Builders<User>.Filter.Regex(u => u.UserName,
                     new BsonRegularExpression(string.Format("^{0}", userName), "i"));
            }
            //
            //	filter by emailAddress
            //
            if (emailAddress.Length > 0)
            {
                filter = filter & Builders<User>.Filter.Regex(u => u.EmailAddress,
                    new BsonRegularExpression(string.Format("{0}", emailAddress), "i"));
            }

            long numberOfRows = await _context.Users.CountDocumentsAsync(filter);

            var userCollection = await _context.Users.Find(filter)
                .Skip(paging.CurrentPageNumber * paging.PageSize)
                .Limit(paging.PageSize)
                .Sort(sortExpression)
                .Project(u=>new
                {
                    u.Id,
                    u.UserName,
                    u.EmailAddress,
                    u.AccessToken,
                    u.ExpiresIn,
                    u.LimitedTotal,
                })
                .ToListAsync();

            List<User> users = new List<User>();

            foreach (var userDocument in userCollection)
            {
                User user = new User();

                user.Id = userDocument.Id;
                user.UserName = userDocument.UserName;
                user.EmailAddress = userDocument.EmailAddress;
                user.ExpiresIn = userDocument.ExpiresIn;
                user.LimitedTotal = userDocument.LimitedTotal;

                users.Add(user);
            }

            paging.TotalRows = numberOfRows;
            paging.TotalPages = Utils.CalculateTotalPages(numberOfRows, paging.PageSize);

            return users;
        }

        /// <summary>
		/// Get User Detail
		/// </summary>
		/// <param name="userId"></param>
		/// <returns></returns>
		public async Task<ResponseModel<UserDataTransformation>> GetUserDetail(string userId)
        {

            ResponseModel<UserDataTransformation> returnResponse = new ResponseModel<UserDataTransformation>();

            UserDataTransformation user = new UserDataTransformation();

            try
            {
                //count tokenbyuyser id
                ObjectId objectIdentifier = new ObjectId(userId);

                FilterDefinition<Token> filter = Builders<Token>.Filter.Eq(t => t.UserId, objectIdentifier);

                var resultCount = await _context
                        .Tokens
                        .Find(filter)
                        .ToListAsync();
                User userDetail = await GetUserById(userId);

                UserDataTransformation userDataTransformation = new UserDataTransformation();
                userDataTransformation.id = Convert.ToString(userDetail.Id);
                userDataTransformation.UserName = userDetail.UserName;
                userDataTransformation.Password = userDetail.Password;
                userDataTransformation.AccessToken = userDetail.AccessToken;
                userDataTransformation.EmailAddress = userDetail.EmailAddress;
                userDataTransformation.ExpiresIn = userDetail.ExpiresIn;
                userDataTransformation.Gender = userDetail.Gender;
                userDataTransformation.InExuer = userDetail.InExuer;
                userDataTransformation.UserTokenTotal = resultCount.Count;
                returnResponse.Entity = userDataTransformation;

                returnResponse.ReturnStatus = true;

            }
            catch (Exception ex)
            {
                returnResponse.ReturnStatus = false;
                returnResponse.ReturnMessage.Add(ex.Message);
            }
            finally
            {
            }

            return returnResponse;

        }

        public async Task<User> ChangePassword(UserChangePassword user)
        {
            try
            {
                var objUser = new User();
                objUser = await GetUserById(user.id);
                if (objUser != null)
                {
                    //check pass
                    if (SecurityBCryptMethod.VerifyPassword(user.Password, objUser.Password))
                    {
                        // update pass
                        objUser.Password = SecurityBCryptMethod.CreatePasswordHash(user.NewPassword);
                        await Update(objUser);

                    }
                    else
                        return null;

                }

                return objUser;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
