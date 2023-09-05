namespace DOMAIN.Domain
{
    public class Question
    {
        public string id { get; set; }
        public DateTime created { get; set; }
        public string Text { get; set; }
        public Topic Topic { get; set; }
        public int TopicId { get; set; }

    }
}
