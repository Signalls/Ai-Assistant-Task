using DOMAIN.Domain;

namespace SERVICES.AccountService
{
    public interface ITopicService
    {
        Task<bool> DeleteTopic(int TopicId);
        Task<List<Topic>> GetListOfTopic();
        Task<List<Question>> GetChat(int TopicId);
        Task<bool> UpDateTopic(Topic topic);
    }
}
