namespace SERVICES.AccountService
{
    public interface IChatGPTService
    {
        Task<string> CreateNewChat(string UserId, string question);
        Task<string> CreateNewChat2(string UserId, int TopicId);
        Task<string> UseChat(int TopicId, string question);
        Task<string> UseChat2(int TopicId, string question);
        Task<string> GetQuestion(int TopicId);
    }
}
