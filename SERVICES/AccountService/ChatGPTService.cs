using AutoMapper;
using DOMAIN.Domain;
using DOMAIN.DTO;
using INFRASTRUCTURE.IRepository;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using OpenAI_API;
using OpenAI_API.Completions;
using SERVICES.AccountService;

namespace SERVICES.AccountServicet
{
    public class ChatGPTService : IChatGPTService
    {
        private readonly IMapper _mapper;
        private readonly IQuestionRepository _repository;
        private readonly ITopicRepository _topic;
        private readonly IConfiguration _configuration;

        public ChatGPTService(IMapper mapper, IQuestionRepository repository, ITopicRepository topic, IConfiguration configuration)
        {
            _mapper = mapper;
            _repository = repository;
            _topic = topic;
            _configuration = configuration;
        }

        // Create a new chat session
        public async Task<string> CreateNewChat(string UserId, string question)
        {
            // Create a new topic
            var topic = new Topic
            {
                Createdat = DateTime.Now,
                Title = question,
            };

            // Save the topic and initiate the chat
            var Q1 = await _topic.SaveTopic(topic);
            var chat = await UseChat(topic.Id, question);
            return chat != null ? chat : null;
        }

        // Get a random question by TopicId
        public async Task<string> GetQuestion(int TopicId)
        {
            List<string> questionList = new List<string>();

            var gQuestion = await _repository.GetListQuestion();
            foreach(var question in gQuestion)
            {
                if(question.TopicId == TopicId)
                {
                    questionList.Add(question.id.ToString());
                }
            }

            // Select a random question from the list
            Random random = new Random();
            int num = random.Next(1, questionList.Count);
            var questionId = questionList[num - 1];
            var questionToGet = await _repository.GetQuestion(questionId);
            return questionToGet;
        }

        // Use the OpenAI chat model to generate a response
        public async Task<string> UseChat(int TopicId, string question)
        {
            string openAIKey = _configuration["OpenAI:APIKey"];
            var openAI = new OpenAIAPI(openAIKey);
            CompletionRequest request = new CompletionRequest();
            request.Prompt = question;
            request.Model = OpenAI_API.Models.Model.DavinciText;
            request.MaxTokens = 4080; // Set your maximum limit here




            // Generate a response from the AI model
            var completions = await openAI.Completions.CreateCompletionAsync(request);
            var result = _mapper.Map<QuestionDto>(completions);
            var response = new QuestionResponseDto
            {
                Text = completions.Completions.ToList(),
            };
            result.Text = response.Text.ToList();
            var quest = new Question();
            quest.id = result.id;
            quest.TopicId = TopicId;
            var newk = result.Text;
            string json = JsonConvert.SerializeObject(newk);
            List<MyObject> data = JsonConvert.DeserializeObject<List<MyObject>>(json);
            foreach(var item in data)
            {
                string textValue = item.text;
                quest.Text = item.text;
            }
            quest.created = DateTime.Now;
            await _repository.SaveQuestion(quest);
            return quest.Text;
        }

        // Create a new chat session based on a topic
        public async Task<string> CreateNewChat2(string UserId, int TopicId)
        {
            var topic = await _topic.GetTopics(TopicId);
            var chat = await UseChat2(topic.Id, topic.Title);
            return chat != null ? chat : null;
        }

        // Use the OpenAI chat model to generate a response with a specific prompt
        public async Task<string> UseChat2(int TopicId, string question)
        {
            var openAI = new OpenAIAPI("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");
            CompletionRequest request = new CompletionRequest();
            request.Prompt = $"Ask ten questions with options A,B,C,D and an answer on {question}";
            request.Model = OpenAI_API.Models.Model.DavinciText;
            request.MaxTokens = 4080;

            // Generate a response from the AI model
            var completions = await openAI.Completions.CreateCompletionAsync(request);
            var result = _mapper.Map<QuestionDto>(completions);
            var response = new QuestionResponseDto
            {
                Text = completions.Completions.ToList(),
            };
            result.Text = response.Text.ToList();
            var quest = new Question();
            quest.id = result.id;
            quest.TopicId = TopicId;
            var newk = result.Text;
            string json = JsonConvert.SerializeObject(newk);
            List<MyObject> data = JsonConvert.DeserializeObject<List<MyObject>>(json);
            foreach(var item in data)
            {
                string textValue = item.text;
                quest.Text = item.text;
            }
            quest.created = DateTime.Now;
            await _repository.SaveQuestion(quest);
            return quest.Text;
        }
    }
}
