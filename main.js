//to be used in google script
function email() {

	Logger = BetterLog.useSpreadsheet('spreadsheetId');

	var email = GmailApp.search('label:inbox is:unread from:admin@indoorhoops.com');
	Logger.log(email)

	if (email.length == 0) {
		Logger.log("we are done")
	} else {
		var emailMessage = email[0].getMessages()[0];
		emailMessage.markRead()
		var emailBody = emailMessage.getPlainBody();
		var emailArray = [];
		emailArray.push(emailBody)
		var start = parseInt(emailArray[0].indexOf("GAMES:"));
		var finish = parseInt(emailArray[0].indexOf("Grand Total:"));
		var ballInfo = emailArray[0].slice(start, finish);
		var gameDate = (ballInfo.slice(7, 18));
		var gameStart = ballInfo.slice(20, 29);
		var gameEnd = ballInfo.slice(30, 38);
		var description = ballInfo.slice(40, 66)
		var startTime = gameDate + " " + gameStart;
		var endTime = gameDate + " " + gameEnd;
		var event = CalendarApp.getDefaultCalendar().createEvent('Basketball',
			new Date(startTime),
			new Date(endTime), {
				description: description
			});
		Logger.log('Event ID: ' + event.getId());


	}
};
