using DOMAIN.Domain;

namespace INFRASTRUCTURE.IRepository
{
    public interface ITopicRepository
    {
        Task<List<Topic>> GetListOfTopics();
        Task<bool> DeleteTopic(int Id);
        Task<bool> SaveTopic(Topic topic);
        Task<List<Question>> GetListOfQuestionsByTopic(int TopicId);
        Task<Topic> GetTopics(int TopicId);
        Task<bool> UpDateTopic(Topic topic);
    }
}
