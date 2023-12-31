﻿using UserProfileData.Domain;
using UserProfileData.DTO;

namespace SERVICES.AccountService
{
    public interface IAccountService
    {
        public Task<ResponseDto<Object>> CreateUserProfile(UserProfile user, string Password);
        public Task<APIResponse> AuthenticateUser(LoginRequestDto loginModel);
        public Task<ResponseDto<UserProfileUpdateDto>> GetLoggedInUserByToken(string token);
        public Task<ResponseDto<Object>> UpdateUser(string token, UserProfileUpdateDto updateUserDto);

    }
}
