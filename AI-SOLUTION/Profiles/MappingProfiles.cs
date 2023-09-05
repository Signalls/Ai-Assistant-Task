using AutoMapper;
using DOMAIN.Domain;
using DOMAIN.DTO;
using OpenAI_API.Completions;
using UserProfileData.Domain;
using UserProfileData.DTO;

namespace UserManagementSystemAPI.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<UserProfile, UserProfileUpdateDto>().ReverseMap();
            CreateMap<UserProfile, UserProfileDto>().ReverseMap();
            CreateMap<CompletionResult, QuestionDto>().ReverseMap();
            //CreateMap<completion, CompletionResult>().ReverseMap();
            CreateMap<Question, QuestionDto>().ReverseMap();
        }
    }
}
