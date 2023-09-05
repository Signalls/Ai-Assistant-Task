namespace DOMAIN.DTO
{
    public class QuestionDto
    {
        public string id { get; set; }
        public DateTime created { get; set; }
        public List<OpenAI_API.Completions.Choice> Text { get; set; }
    }
}
