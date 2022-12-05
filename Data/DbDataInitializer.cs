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
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Common", Name = "Wood", Description = "Common Material - Can mostly be found in woods"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Common", Name = "Iron", Description = "Common Material - Can mostly be found in rocky areas"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Uncommon", Name = "Steel", Description = "Uncommon Material - Must be forged from iron"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rare", Name = "Arkanit", Description = "Uncommon Material - Can only be found in orc territory within mines and must be forged"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rare", Name = "Mithril", Description = "Rare Material - Can only be gotten by dwarfs they sell it for a high price"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Arkanithril", Description = "Rare Material - Can only be obtained when arkanit and mithril will be forged together"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Obsidian", Description = "Very Rare Material - Can only be obtained from deep stone layers in active volcanic areas"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rarest", Name = "Platinum", Description = "Very Rare Material - Can only be obtained from deep stone layers in rare mostly dangerous areas"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rarest", Name = "Adamantium", Description = "Rarest Material - Can only be obtained from very deep stone layers and must be forged for a long time"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rarest", Name = "Cold Fire", Description = "Rarest Material - Can only be found in cold areas to convert clear ice into the blue fire with magic"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rarest", Name = "Soul", Description = "Rarest Material - Can only be obtained with a soul vessel and a weapon that can split souls"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Demonblood", Description = "Very Rare Material - Can only be obtained from a demon"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Dragonblood", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rarest", Name = "Tear of a soulless Creature", Description = "Rarest Material - Can only be obtained from a creature without a soul that feel sorrow"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Dragonscale", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Dragontooth", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Dragonclaw", Description = "Very Rare Material - Can only be obtained from a dragon"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Demonhorn", Description = "Very Rare Material - Can only be obtained from a demon or rarly found when the horn drop of"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Very Rare", Name = "Demontooth", Description = "Very Rare Material - Can only be obtained from a demon or rarly found when the teeths drop out"},
                    new Article { Price = Random.Shared.NextDouble()*Random.Shared.Next(10,100), Rarity = "Rarest", Name = "Eternal Ice", Description = "Rarest Material - Can only be found in the coldest areas where everthing will be frozen"},
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
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Yulor Dragonscale", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Shintin Atem", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Rith Weaverspring", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Riu Akamaru", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Dune Fairydale", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Elonia Seadraking", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Mithiria Shineray", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Adrian Lifeforce", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Gil Flamegale", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                    new Order { ArticleId = Random.Shared.Next(1,articleCount+1), Amount = Random.Shared.Next(1, 11), Recipient = "Pheonix Spiritfire", DeliveryDay = DateTime.Now.AddDays(Random.Shared.Next(180, 365)) },
                };

                context.Orders.AddRange(orders);
                context.SaveChanges();
            }
        }
    }
}
