using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SERVICES.AccountService;
using UserProfileData.Domain;
using UserProfileData.DTO;

namespace UserManagementSystemAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _userService;
        private readonly IMapper _mapper;
        public AccountController(IAccountService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        [HttpPost("create/user")]
        public async Task<IActionResult> CreateUserProfile(UserProfileDto userProfile)
        {
            if(ModelState.IsValid)
            {
                var user = _mapper.Map<UserProfile>(userProfile);
                var createUser = await _userService.CreateUserProfile(user, userProfile.Password);
                if(createUser.StatusCode == 200)
                {
                    return Ok(createUser);
                }
                return BadRequest(createUser);
            }
            return BadRequest(userProfile);
        }
        [HttpPost("authenticate/user")]
        public async Task<IActionResult> AuthenticateUser(LoginRequestDto userProfile)
        {
            if(ModelState.IsValid)
            {
                var createUser = await _userService.AuthenticateUser(userProfile);
                if(createUser.StatusCode == 200)
                {
                    return Ok(createUser);
                }
                return BadRequest(createUser);
            }
            return BadRequest(userProfile);
        }
        [HttpGet("user/profile")]
        public async Task<IActionResult> GetUserProfile(string token)
        {
            if(ModelState.IsValid)
            {

                var userProfile = await _userService.GetLoggedInUserByToken(token);
                if(userProfile.StatusCode == 200)
                {
                    return Ok(userProfile);
                }
                return BadRequest(userProfile);
            }
            return BadRequest(token);
        }
        [HttpPut("update/user/profile")]
        public async Task<IActionResult> UpdateUserProfile(string token, UserProfileUpdateDto userProfileUpdateDto)
        {
            if(ModelState.IsValid)
            {
                var userProfile = await _userService.UpdateUser(token, userProfileUpdateDto);
                if(userProfile.StatusCode == 200)
                {
                    return Ok(userProfile);
                }
                return BadRequest(userProfile);
            }
            return BadRequest(userProfileUpdateDto);
        }
    }
}
