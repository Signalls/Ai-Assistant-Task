using DOMAIN.Domain;

namespace INFRASTRUCTURE.IRepository
{
    public interface IQuestionRepository
    {
        Task<List<Question>> GetListQuestion();
        Task<string> GetQuestion(string Id);
        Task<bool> DeleteQuestion(string Id);
        Task<bool> SaveQuestion(Question question);
    }
}
