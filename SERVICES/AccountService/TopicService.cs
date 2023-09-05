using DOMAIN.Domain;
using INFRASTRUCTURE.IRepository;

namespace SERVICES.AccountService
{
    public class TopicService : ITopicService
    {
        private readonly ITopicRepository _topic;
        public TopicService(ITopicRepository topic)
        {
            _topic = topic;
        }
        public async Task<bool> UpDateTopic(Topic topic)
        {
            var tp = await _topic.GetTopics(topic.Id);
            if(tp == null)
            {
                return false;
            }
            else
            {
                tp.Question = topic.Question;
                tp.TotalScore = topic.TotalScore;
                await _topic.UpDateTopic(tp);
                return true;
            }
        }
        public async Task<List<Question>> GetChat(int TopicId)
        {
            var chat = await _topic.GetListOfQuestionsByTopic(TopicId);
            return chat;
        }
        public async Task<List<Topic>> GetListOfTopic()
        {
            var chat = await _topic.GetListOfTopics();
            return chat;
        }
        public async Task<bool> DeleteTopic(int TopicId)
        {
            var chat = await _topic.DeleteTopic(TopicId);
            return chat;

        }
    }
}
