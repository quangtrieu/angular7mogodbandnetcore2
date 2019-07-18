using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using VNC.Domain.Commons;
using VNC.Domain.Entities;
using VNC.Domain.ViewModel;
using VNC.Infrastructure.Interfaces;

namespace VNC.Infrastructure.Repositories
{
    public class TokenRepository : ITokenRepository
    {
        private readonly IMongoDBContext _context;

        public TokenRepository(IMongoDBContext context)
        {
            _context = context;
        }

        public async Task Create(Token token)
        {
            await _context.Tokens.InsertOneAsync(token);
        }

        public async Task<bool> Delete(string Id)
        {
            ObjectId objectIdentifier = new ObjectId(Id);

            FilterDefinition<Token> filter = Builders<Token>.Filter.Eq(m => m.Id, objectIdentifier);

            DeleteResult deleteResult = await _context
                                                .Tokens
                                                .DeleteOneAsync(filter);

            return deleteResult.IsAcknowledged
                && deleteResult.DeletedCount > 0;
        }

        public async Task<IEnumerable<Token>> GetAllTokens()
        {
            return await _context
                           .Tokens
                           .Find(_ => true)
                           .ToListAsync();
        }

        public async Task<Token> GetTokenById(string Id)
        {
            ObjectId objectIdentifier = new ObjectId(Id);

            FilterDefinition<Token> filter = Builders<Token>.Filter.Eq(m => m.Id, objectIdentifier);

            return await _context
                    .Tokens
                    .Find(filter)
                    .FirstOrDefaultAsync();
        }
        /// <summary>
		/// Get Users
		/// </summary>
		/// <returns></returns>
		public async Task<List<User>> GetUsers()
        {
            string sortExpression = "{ExpiresIn: -1}";
            FilterDefinition<User> filter = Builders<User>.Filter.Empty;
            List<User> users = await _context.Users.Find(filter).Sort(sortExpression).ToListAsync();
            return users;
        }
        public async Task<ResponseModel<List<TokenViewModel>>> GetTokenByUser()
        {
            ResponseModel<List<TokenViewModel>> returnResponse = new ResponseModel<List<TokenViewModel>>();
            List<TokenViewModel> tokenList = new List<TokenViewModel>();
            try
            {
                List<User> users = await GetUsers();
                List<Token> tokens = await _context
                           .Tokens
                           .Find(_ => true)
                           .ToListAsync();
                foreach (User user in users)
                {
                    foreach (Token token in tokens)
                    {
                        if(token.UserId.Equals(user.Id))
                        {
                            TokenViewModel tokenDataTransformation = new TokenViewModel();
                            tokenDataTransformation.Id = token.Id;
                            tokenDataTransformation.UserId = user.Id;
                            tokenDataTransformation.UserName = user.UserName;
                            tokenDataTransformation.TokenKey = token.TokenKey;

                            tokenList.Add(tokenDataTransformation);
                        }
                    }

                }

                returnResponse.Entity = tokenList;

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

        public async Task<bool> Update(Token token)
        {
            ReplaceOneResult updateResult =
               await _context
                       .Tokens
                       .ReplaceOneAsync(
                           filter: t => t.Id == token.Id,
                           replacement: token);

            return updateResult.IsAcknowledged
                    && updateResult.ModifiedCount > 0;
        }

        public async Task<IEnumerable<TokenViewModel>> GetAllUserTokens()
        {
            List<TokenViewModel> tokenList = new List<TokenViewModel>();
            try
            {
                List<User> users = await GetUsers();
                List<Token> tokens = await _context
                           .Tokens
                           .Find(_ => true)
                           .ToListAsync();
                foreach (User user in users)
                {
                    foreach (Token token in tokens)
                    {
                        if (token.UserId.Equals(user.Id))
                        {
                            TokenViewModel tokenDataTransformation = new TokenViewModel();
                            tokenDataTransformation.Id = token.Id;
                            tokenDataTransformation.UserId = user.Id;
                            tokenDataTransformation.UserName = user.UserName;
                            tokenDataTransformation.TokenKey = token.TokenKey;

                            tokenList.Add(tokenDataTransformation);
                        }
                    }

                }
            }
            catch (Exception)
            {
              
            }
            return tokenList;
        }
    }
}
