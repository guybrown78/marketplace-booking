
# NOTES

# Discounts. 

The final `checkout` screen shows a discounts row in the Totals. My understanding is that discounts are set data side on a tennant/supplier/course basis. Therefore, the discounts should appear in the CoursePriceModel as this is course and supplier specific (scheduleId) and tennant specific (api url)

Below shows an example of how we might implement this. 
We add a `discount` param to the price model which is a percentage. In this example the discount is 5%.


```json
[
  {
    "standardId":"",
    "scheduledCourseId":"",
    "name":"",
    "type":{},
    "location":{},
    "supplier":{},
    "startDate":"",
    "duration":{},
    "prices":{
      "currency":"GBP",
      "total":490,
      "incVat":false,
      "discount":5
    },
    "availability":{}
  }
]
```

Therefore: 
```
The course price = £490

Take 5% off that total price (5% of 490 = 24.5) = £466.45

Plus the tax, set in the app config @ 20% (£93.29) = £559.74
```
This way means we can show the discount in the course node, and calculate the discount to be displayed in the totals. 

# FINALISE BOOKING

https://xd.adobe.com/view/30678b83-84a4-4d3a-94bc-1a4c7b968e23-6534/


From selecting a course, the UI moves to the booking page where a single course is selected. From here the user can add Delegates to the course and additional notes. Once happy the user can aslo add additional courses and/or confirm booking.

initial questions and answers...

 1. Are we saving the course just once, at the very end of the process? or are we saving along the way to 'save' for later?

 Saving at the very end. One call, One confirmation

 2. what if, during the saving process another user takes all the spaces? error handling needs to be in place (API standerd?).

 Answered below in booking confirmation

 3. Are the additional notes per booking? per course (additional courses allowed), per delegate?

 Answered below - per booking like in TMS

 4. Additional courses, are they handled seperatly so the save process can be sequential? thus, handling #2 better

 Sequentially in later phases

 5. What happens at confirm booking? Pay, email? return back?

 confirmation message then company recieves invoice. no online payment



## ADDING DELEGATES
 Once selecting a scheduledCourseId the user moves to the 'add delegates page.

 here, the user interacts with the delegates search input using the previous `GET` call `tenant.ontransform.com/api/bookingform/delegates?search=name|bl` to select a delegate one at a time.

 within the client, a list of delegates is stored against the selected scheduledCourseId. If multiple delegates were passed into the app from the entry data, then these delegates are displayed here.

 Client validation to make sure that the user hasn't selected more delegates than the course has spaces for

## CONFIRM BOOKING
UI shows each delegate as an item of the scheduledCourseId. Displaying them like a ecommerce basket with the ability to remove them from the booking

A totals node follows all the items. This is calculated by the client from the scheduledCourseModels price.

There is an additional notes form on this page too. The additional notes is PER BOOKING as per TMS. It populates the fields:

- PO Number (text field)
- Level (text field)
- If a TMS cost, state why (text area)
- Reason for training (text area)

There is an option here to add more courses - after speaking to Dave, this isn't in the scope of this phase of work but it is worth thinking about the architecture of the data, and how to save multiple courses...

Finally, there is a confirm booking button. 

## SAVING...
Not shown on these slides but this booking rocess could take some time to respond so a loading screen is needed

## BOOKING CONFIRMATION
Not shown on these slides but after speaking to Dinesh, there needs to be a tabular style list of each item that you attempted to book. These items will show success/failed flags. If failed, then the reason can be shown within the item

However, after speaking to Dave, there needs be a less automated approach when deciding which delegates get booked on a course and which dont due to lack of spaces. So the scheduledCourse will return an overall error that states that there are too many delegates for the spots. The UI will then let the user organise the delegates to try again.
