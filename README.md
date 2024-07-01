
בתקיית
config 
יש שתי סביבות עבודה 
משנים את ה 
path 

Prod/Dev 
ומריצים לפי בחירה 

//const configDotEnv = () => 
// Load the general .env file
//config({ path: "src/config/.env.*Dev*" }); / config({ path: "src/config/.env.*Prod*" });


chalk 
עשה לי בעיות בקוד אם תמצאו את הבעיה אשמח שתכתבו לי 
יותר מזה אני השתמשתי בכל הספריות הרשומות

TypeScript modules (tsconfig.json with "module": "commonjs") expect CommonJS modules by default, but chalk is an ES module.
אולי בגלל זה 

לפי מה שבדקתי דרך 
postman
הבקשות לשרת עובדות בשתי סביבות העבודה
הסביבה בענן אטלס מוצפנת ללא הסיסמה 
"Prod is enctypted"


בחלק מהקודים יש הערות שהם קודים ("//") , אלו קודים שניסיתי ותיקנתי עד שהגעתי לתוצאה שרציתי אני חושב שחשוב להשאיר את זה מכיוון שזה 
.מראה לי איפה טעיתי ואם אני מתפקשש בקוד אני תמיד יכול לחזור אחורה לאיזה חלק שארצה