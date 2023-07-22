SELECT 
  COUNT(prod.id) * 5 as "Purchase Count",
  u.id as "userId",
  prod.id as "ProductId",
  round(prod.price, 2),
  prod.category,
  prod.item,
  prod.variety
FROM purchases AS pur
INNER JOIN users AS u ON u.id = pur.userid
INNER JOIN "ProductPurchase" AS prodpur ON prodpur.purchaseid = pur.id
INNER JOIN "Product" AS prod ON prod.id = prodpur.productid
WHERE u.id = 5
GROUP BY 
"userId", 
"ProductId",
  prod.price,
  prod.category,
  prod.item,
  prod.variety
  ORDER BY "Purchase Count" desc;


SELECT 
  u.id as "userId",
  upv."viewCount",
  prod.id as "ProductId",
  round(prod.price, 2),
  prod.category,
  prod.item,
  prod.variety
FROM "UserProductView" as upv
INNER JOIN "Product" as prod on prod.id = upv.productid
INNER JOIN users AS u ON u.id = upv.userid
order by upv."viewCount" desc;


SELECT *
FROM users
WHERE EXTRACT(DOY FROM birthday) BETWEEN EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days')
OR (EXTRACT(DOY FROM CURRENT_DATE + INTERVAL '7 days') < EXTRACT(DOY FROM CURRENT_DATE) AND EXTRACT(DOY FROM birthday) >= EXTRACT(DOY FROM CURRENT_DATE))
ORDER BY EXTRACT(DOY FROM birthday);