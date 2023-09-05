using DOMAIN.Domain;
using INFRASTRUCTURE.IRepository;
using Microsoft.EntityFrameworkCore;
using UserProfileData.Context;

namespace INFRASTRUCTURE.Repository
{
    public class TopicRepository : ITopicRepository
    {
        private readonly AIContext _context;

        public TopicRepository(AIContext context)
        {
            _context = context;
        }
        public async Task<bool> SaveTopic(Topic topic)
        {
            var Q1 = await _context.Topics.AddAsync(topic);
            var save = _context.SaveChanges();
            return save > 0 ? true : false;
        }
        public async Task<bool> UpDateTopic(Topic topic)
        {
            var Q1 = _context.Topics.Update(topic);
            var save = await _context.SaveChangesAsync();
            return save > 0 ? true : false;
        }
        public async Task<bool> DeleteTopic(int TopicId)
        {
            var T1 = await _context.Topics.FindAsync(TopicId);
            if(T1 != null)
            {
                var delete = _context.Topics.Remove(T1);
                var save = await _context.SaveChangesAsync();
                return save > 0 ? true : false;

            }
            return false;
        }
        public async Task<List<Question>> GetListOfQuestionsByTopic(int TopicId)
        {
            var Q1 = await _context.Question.Where(x => x.TopicId == TopicId).ToListAsync();
            return Q1.Count > 0 ? Q1 : null;
        }
        public async Task<List<Topic>> GetListOfTopics()
        {
            var Q1 = await _context.Topics.ToListAsync();
            return Q1.Count > 0 ? Q1 : null;
        }
        public async Task<Topic> GetTopics(int TopicId)
        {
            var Q1 = await _context.Topics.FindAsync(TopicId);
            return Q1 != null ? Q1 : null;
        }
    }
}
