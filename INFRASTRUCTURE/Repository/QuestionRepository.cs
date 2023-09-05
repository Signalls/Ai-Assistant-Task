using DOMAIN.Domain;
using INFRASTRUCTURE.IRepository;
using Microsoft.EntityFrameworkCore;
using UserProfileData.Context;

namespace INFRASTRUCTURE
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly AIContext _context;

        public QuestionRepository(AIContext context)
        {
            _context = context;
        }
        public async Task<bool> SaveQuestion(Question question)
        {
            var Q1 = await _context.Question.AddAsync(question);
            var save = _context.SaveChanges();
            return save > 0 ? true : false;
        }
        public async Task<bool> DeleteQuestion(string Id)
        {
            var Q1 = await _context.Question.FindAsync(Id);
            if(Q1 != null)
            {
                var delete = _context.Question.Remove(Q1);
                var save = await _context.SaveChangesAsync();
                return save > 0 ? true : false;

            }
            return false;
        }
        public async Task<string> GetQuestion(string Id)
        {
            var Q1 = await _context.Question.FindAsync(Id);
            return Q1.Text != null ? Q1.Text : null;

        }
        public async Task<List<Question>> GetListQuestion()
        {
            var Q1 = await _context.Question.ToListAsync();
            return Q1.Count > 0 ? Q1 : null;
        }
    }
}
