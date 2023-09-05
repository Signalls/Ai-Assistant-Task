namespace DOMAIN.Domain
{
    public class Topic
    {
        public int Id { get; set; }
        public IEnumerable<Question> Question { get; set; }
        public string Title { get; set; }
        public DateTime Createdat { get; set; }
        public DateTime Modifiedat { get; set; }
        public int TotalScore { get; set; } = 0;

    }
}
