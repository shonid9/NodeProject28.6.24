// class Logger {
//   static error(...messages: any[]) {
//     console.error(...messages); // No chalk usage
//   }

//   static info(...messages: any[]) {
//     if (process.env.NODE_ENV === 'prod') return;
//     console.info(...messages); // No chalk usage
//   }

//   static debug(...messages: any[]) {
//     console.debug(...messages); // No chalk usage
//   }

//   static verbose(...messages: any[]) {
//     if (process.env.NODE_ENV === 'prod') return;
//     console.log(...messages); // No chalk usage
//   }

//   static log(...messages: any[]) {
//     if (process.env.NODE_ENV === 'prod') return;
//     console.log(...messages); // No chalk usage
//   }
// }

// export { Logger };
// src/logs/logger.ts
// logger.ts


//chalk עשה לי בעיות
// לכן אילתרתי את הקוד והוספתי צבעים ללוגר
// כדי להבדיל בין הודעות שונות
// כל סוג של הודעה יהיה בצבע אחר
// כדי שיהיה קל להבחין ביניהם
// אם זה מידע כללי אז יהיה ירוק
// אם זה מידע נוסף אז יהיה ציאן
// אם זה דיבאג אז יהיה מג'נטה
// אם זה אינפו אז יהיה כחול
// אם זה שגיאה אז יהיה אדום










//what the Logger class does , it is responsible for logging messages to the console
//it has 5 methods to log different types of messages
//error, info, debug, verbose, log
//each method logs a different color to the console
//red for errors
//blue for info
//magenta for debug
//cyan for verbose
//green for general logs


class Logger {
  static warn(_arg0: string) {
    throw new Error("Method not implemented.");
  }
  static error(...messages: any[]) {
    console.error('\x1b[31m', ...messages, '\x1b[0m'); // Red color for errors
  }

  static info(...messages: any[]) {
    if (process.env.NODE_ENV === 'prod') return;
    console.info('\x1b[34m', ...messages, '\x1b[0m'); // Blue color for info
  }

  static debug(...messages: any[]) {
    console.debug('\x1b[35m', ...messages, '\x1b[0m'); // Magenta color for debug
  }

  static verbose(...messages: any[]) {
    if (process.env.NODE_ENV === 'prod') return;
    console.log('\x1b[36m', ...messages, '\x1b[0m'); // Cyan color for verbose
  }

  static log(...messages: any[]) {
    if (process.env.NODE_ENV === 'prod') return;
    console.log('\x1b[32m', ...messages, '\x1b[0m'); // Green color for general logs
  }
}

export { Logger };


