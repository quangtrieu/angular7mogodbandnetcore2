using MongoDB.Driver;
using System;
using System.Threading.Tasks;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Framework.SecurityServices;
using VNC.Framework.SecurityServices.BCrypt;
using VNC.Infrastructure.Interfaces;

namespace VNC.Infrastructure.Repositories
{
    public class AuthRepository: IAuthRepository
    {
        private readonly IMongoDBContext _context;

        public AuthRepository(IMongoDBContext context)
        {
            _context = context;
        }


        public async Task<User> GetUser(string username, string password)
        {

            var builder = Builders<User>.Filter;
            var filter = builder.Eq("UserName", username) & builder.Eq("Password", password);

            return await _context.Users
                        .Find(filter)
                        .FirstOrDefaultAsync();
        }
      
        /// <summary>
        /// Validation UserName & Password
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public string Login(LoginDto loginDto, string SigningSecret, string ExpiryDuration)
        {
           var tokenString = "";
           var user = _context.Users.Find(u => u.UserName == loginDto.UserName).SingleOrDefault();

            if (user == null)
            {
                return null;
            }
            else
            {
                if (SecurityBCryptMethod.VerifyPassword(loginDto.Password, user.Password))
                {
                    // generate token
                    tokenString = SecurityTokenMethod.JWTAuthenticationToken(SigningSecret, ExpiryDuration, user);
                    //update token in user
                    user.AccessToken = tokenString;
                    user.UpdatedDate = DateTime.Now;
                    _context.Users.ReplaceOneAsync(filter: u => u.Id == user.Id,replacement: user);
                    //insert token 
                    var token = new Token();
                    token.UserId = user.Id;
                    token.TokenKey = tokenString;
                    token.CreatedDate = DateTime.Now;
                    token.CreatedBy = user.UserName;// user login
                    _context.Tokens.InsertOneAsync(token);
                }
                else
                    return null;
            }
            return tokenString;
        }

        /// <summary>
		/// IsAuthenticated
		/// </summary>
		/// <param name="LoginDto"></param>
		/// <returns></returns>
		public User IsAuthenticated(LoginDto loginDto, string SigningSecret, string ExpiryDuration)
        {
            var user = new User();
            try
            {
                // check user
                user = _context.Users.Find(u => u.UserName == loginDto.UserName).SingleOrDefault();
                //check pass
                if (user != null)
                {
                    if (SecurityBCryptMethod.VerifyPassword(loginDto.Password, user.Password))
                    {
                        if (user.AccessToken != null)
                        {
                            // update token user when Expires

                        }
                        else
                        {
                            // generate token
                            var tokenString = SecurityTokenMethod.JWTAuthenticationToken(SigningSecret, ExpiryDuration, user);
                            var userUpdateToken = new User();
                            user.Id = user.Id;
                            user.AccessToken = tokenString;
                            user.UpdatedDate = DateTime.Now;
                            ReplaceOneResult updateResult = _context.Users.ReplaceOne(filter: u => u.Id == user.Id, replacement: user);

                            if (updateResult.IsAcknowledged && updateResult.ModifiedCount > 0)
                            {
                                //insert token 
                                var token = new Token();
                                token.UserId = user.Id;
                                token.TokenKey = tokenString;
                                token.CreatedDate = DateTime.Now;
                                token.CreatedBy = user.UserName;// user login
                                _context.Tokens.InsertOneAsync(token);
                            }
                        }
                    }
                    else
                        user = null;
                }

                return user;
            }
            catch (Exception)
            {
               
            }
            return user;
        }
    }
}
