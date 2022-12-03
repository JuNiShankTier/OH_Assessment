using OH_Assessment.Models;
using Microsoft.EntityFrameworkCore;

namespace OH_Assessment.Data
{
    public class DbDataInitializer
    {
        public static void Initialize(OrderContext context)
        {
            int articleCount;
            if (!context.Articles.Any())
            {
                var articles = new Article[]
                {
                    new Article { ArticleId = 1, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Wood", Description = "Common Material - Can mostly be found in woods"},
                    new Article { ArticleId = 2, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Iron", Description = "Common Material - Can mostly be found in rocky areas"},
                    new Article { ArticleId = 3, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Steel", Description = "Uncommon Material - Must be forged from iron"},
                    new Article { ArticleId = 4, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Arkanit", Description = "Uncommon Material - Can only be found in orc territory within mines and must be forged"},
                    new Article { ArticleId = 5, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Mithril", Description = "Rare Material - Can only be gotten by dwarfs they sell it for a high price"},
                    new Article { ArticleId = 6, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Arkanithril", Description = "Rare Material - Can only be obtained when arkanit and mithril will be forged together"},
                    new Article { ArticleId = 7, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Obsidian", Description = "Very Rare Material - Can only be obtained from deep stone layers in active volcanic areas"},
                    new Article { ArticleId = 8, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Platinum", Description = "Very Rare Material - Can only be obtained from deep stone layers in rare mostly dangerous areas"},
                    new Article { ArticleId = 9, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Adamantium", Description = "Rarest Material - Can only be obtained from very deep stone layers and must be forged for a long time"},
                    new Article { ArticleId = 10, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Cold Fire", Description = "Rarest Material - Can only be found in cold areas to convert clear ice into the blue fire with magic"},
                    new Article { ArticleId = 11, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Soul", Description = "Rarest Material - Can only be obtained with a soul vessel and a weapon that can split souls"},
                    new Article { ArticleId = 12, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Demonblood", Description = "Very Rare Material - Can only be obtained from a demon"},
                    new Article { ArticleId = 13, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Dragonblood", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { ArticleId = 14, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Tear of a soulless Creature", Description = "Rarest Material - Can only be obtained from a creature without a soul that feel sorrow"},
                    new Article { ArticleId = 15, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Dragonscale", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { ArticleId = 16, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Dragontooth", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { ArticleId = 17, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Dragonclaw", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { ArticleId = 18, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Demonhorn", Description = "Very Rare Material - Can only be obtained from a demon or rarly found when the horn drop of"},
                    new Article { ArticleId = 19, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Demontooth", Description = "Very Rare Material - Can only be obtained from a demon or rarly found when the teeths drop out"},
                    new Article { ArticleId = 20, Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Name = "Eternal Ice", Description = "Rarest Material - Can only be found in the coldest areas where everthing will be frozen"},
                };

                articleCount = articles.Length;
                context.Articles.AddRange(articles);
                context.SaveChanges();
            }
            else
            {
                articleCount= context.Articles.Count();
            }

            if (!context.Orders.Any())
            {
                var orders = new Order[]
                {
                    new Order { OrderId = 1, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Yulor Dragonscale", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 2, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Shintin Atem", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 3, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Rith Weaverspring", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 4, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Riu Akamaru", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 5, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Dune Fairydale", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 6, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Elonia Seadraking", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 7, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Mithiria Shineray", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 8, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Adrian Lifeforce", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 9, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Gil Flamegale", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { OrderId = 10, ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Pheonix Spiritfire", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                };

                context.Orders.AddRange(orders);
                context.SaveChanges();
            }
        }
    }
}
