using DOMAIN.Domain;
using UserProfileData.Context;

namespace DOMAIN.SeedData
{
    public static class SeedData
    {

        public static void SeedDataonDb(AIContext _context)
        {


            if(_context.Topics.Any())
            {
                return; // Data already seeded
            };


            var frequency = new List<Topic>
            {
                new Topic{Title = "Maths",Createdat = DateTime.Now, TotalScore = 0},
                new Topic{Title = "Arts",Createdat = DateTime.Now, TotalScore = 0},
                new Topic{Title = "Science",Createdat = DateTime.Now, TotalScore = 0},
                new Topic{Title = "English",Createdat = DateTime.Now, TotalScore = 0},
                new Topic{Title = "History",Createdat = DateTime.Now, TotalScore = 0},
                new Topic{Title = "Tech",Createdat = DateTime.Now, TotalScore = 0},


            };
            _context.Topics.AddRange(frequency);

            _context.SaveChanges();
        }
    }
}
