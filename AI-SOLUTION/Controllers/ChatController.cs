using DOMAIN.Domain;
using Microsoft.AspNetCore.Mvc;
using SERVICES.AccountService;

namespace AI_SOLUTION.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        private readonly IChatGPTService _chat;
        private readonly ITopicService _topic;
        public ChatController(IChatGPTService chat, ITopicService topic)
        {
            _chat = chat;
            _topic = topic;
        }
        [HttpPost("Newchat")]
        public async Task<IActionResult> CreateNewChat(string UserId, string question)
        {
            if(ModelState.IsValid)
            {
                var createUser = await _chat.CreateNewChat(UserId, question);
                if(createUser != null)
                {
                    return Ok(createUser);
                }
                return BadRequest(createUser);
            }
            return BadRequest(question);
        }
        [HttpPost("update")]
        public async Task<IActionResult> updateChat(Topic topic)
        {
            if(ModelState.IsValid)
            {
                var update = await _topic.UpDateTopic(topic);
                if(update)
                {
                    return Ok(update);
                }
                return BadRequest(update);
            }
            return BadRequest(topic);
        }

        [HttpPost("chat")]
        public async Task<IActionResult> Chat(string userId, int TopicId)
        {
            if(ModelState.IsValid)
            {
                var createUser = await _chat.CreateNewChat2(userId, TopicId);
                if(createUser != null)
                {
                    return Ok(createUser);
                }
                return BadRequest(createUser);
            }
            return BadRequest(userId);
        }
        [HttpGet("TopicQuestions/{TopicId}")]

        public async Task<IActionResult> GetChatTopic(int TopicId)
        {
            var createUser = await _topic.GetChat(TopicId);
            if(createUser != null)
            {
                return Ok(createUser);
            }
            return BadRequest(createUser);


        }
        [HttpGet("Topics")]

        public async Task<IActionResult> GetListOfTopic()
        {

            var createUser = await _topic.GetListOfTopic();
            if(createUser != null)
            {
                return Ok(createUser);
            }
            return BadRequest(createUser);

        }
        [HttpGet("Question/{TopicId}")]

        public async Task<IActionResult> GetQuestion(int TopicId)
        {

            var Question = await _chat.GetQuestion(TopicId);
            if(Question != null)
            {
                return Ok(Question);
            }
            return BadRequest(Question);

        }
        [HttpPost("Question")]
        public async Task<IActionResult> CraeteEduQuestion(string UserId, int TopicId)
        {

            var Question = await _chat.CreateNewChat2(UserId, TopicId);
            if(Question != null)
            {
                return Ok(Question);
            }
            return BadRequest(Question);
        }

    }
}
