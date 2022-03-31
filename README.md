## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Making a plan

1. **Make a drawing of your app. Simple "wireframes"**
1. **Once you have a drawing, name the HTML elements you'll need to realize your vision**
1. **For each HTML element ask: Why do I need this?**
1. **Once we know _why_ we need each element, think about how to implement the "Why" as a "How"**
1. **Find all the 'events' (user clicks, form submit, on load etc) in your app. Ask one by one, "What happens when" for each of these events. Does any state change?**
1. **Think about how to validate each of your features according to a Definition of Done**
1. **Consider what features _depend_ on what other features. Use this dependency logic to figure out what order to complete tasks.**

Additional considerations:

- Ask: which of your HTML elements need to be hard coded, and which need to be dynamically generated?
- Consider your data model.
  - What kinds of objects (i.e., Dogs, Friends, Todos, etc) will you need?
  - What are the key/value pairs?
  - What arrays might you need?
  - What needs to live in a persistence layer?
- Is there some state we need to initialize?
- Ask: should any of this work be abstracted into functions? (i.e., is the work complicated? can it be reused?)

# Workshop Organizer

## Demo

[Link to Demo](https://alchemy-web-workshop-organizer.netlify.app/)

## Getting Started

Use [this template](https://github.com/alchemycodelab/web-template-supabase) to get started.

Create a supbase project with a `workshops` table and a `participants` table. Add a few rows to your workshops table in the supabase.io dashboard.

For the workshops and the participants use `(role() = 'authenticated'::text)` for all CRUD actions row level security.

### Learning Objectives

- Create foreign key relationships in Supabase
- Use the Supabase JS client to fetch related data in Supabase
- Use the Supabase JS client to create data with foreign-key relationships in Supabase

### Description

We will be creating a Workshop Organizer. This app allows you to add participants to workshops.

### Acceptance Criteria

- Users should be able to see a list of workshops with participants on `/workshops`
- Clicking on a participant should delete it from supabase and rerender the list of workshops
- The `/create` page should have a prefilled dropdown menu with the list of workshops from supabase
- Submitting the form on the `/create` page should create a new participant in the workshop and redirect the user back to the `/workshops` page

### Rubric

| Task                                                                                                 | Points |
| ---------------------------------------------------------------------------------------------------- | ------ |
| Main branch deployed to Netlify                                                                      | 1      |
| Open PR from `dev` branch with Netlify deploy preview                                                | 1      |
| Supabase tables properly setup (submit a screenshot with your submission)                            | 2      |
| Supabase policies properly setup (submit a screenshot with your submission)                          | 2      |
| User sees a list of workshops on `/workshops`                                                        | 2      |
| User sees a dropdown of workshops on `/create`                                                       | 2      |
| User can add a partipant to a workshop                                                               | 2      |
| User can remove a participant from a workshop                                                        | 2      |
| ASYNC: `getWorkshops()` : get all workshops with their participants in supabase.                     | 2      |
| ASYNC: `createParticipant(participant)` : create participant in supabase and attach it to a workshop | 2      |
| ASYNC: `deleteParticipant(id)` : delete a participant in supabase                                    | 2      |

### Stretch Goals Ideas

1. Add a page that lets you create a new workshop
2. On click, don't delete the participant--go to the participant's "detail page". The detail page will have an interface that lets the user update the participant. This includes allowing the user to change which workshop the participant belongs to.
3. Automatically generate the participant form using a participant fetched from the database. That way if new properties end up added to the participant table, the front end dev doesn't need to update the front end later.
4. Add filter/sort functionality to the workshops page? Only show participants who are older than 21, for example? Only show workshops with more than 2 participants?
5. _Mega ambitious_: I want to able to drag and drop participants to different workshops.

# Plan

## HTML elements

- workshop page
  - dynamically rendered divs for each workshop
    - header for workshop name
    - div to append participants
      - participant div
- add participant page
  - form to add participant name and their workshop
    - input for participant name
    - dropdown for workshop to attend
    - submit button
- edit participant page
  - form to edit participant name and workshop
    - input prefilled with participant name
    - dropdown preselected with their current workshop
    - submit button
  - delete participant button
- add workshop page
  - form
    - input for workshop name
    - submit button

## Events

- workshop page
  - on load, display workshops divs (with participants)
  - on clicking particpant, redirect to edit participant page
- add participant page
  - on form submission, add new participant to supabase and redirect user back to workshop page
- edit participant page
  - on form submission, update participant info and redirect user back to workshop page
  - on clicking delete participant, delete participant from supabase and redirect user back to workshop page
- add workshop page
  - on form submission, add workshop to supabase and redirect user back to workshop page

## Order

1. supabase CRUD functions
2. HTML skeleton for workshop page
3. write displayAllWorkshops function
4. write workshop page on load event listener
5. HTML skeleton for add participant page
6. write add participant form event listener
7. HTML skeleton for edit participant page
8. add event listener to displayAllWorkshops that redirects user to edit participant page when they click on a participant
9. write edit participant form event listener
10. write delete participant button event listener
11. HTML skeleton for add workshop page
12. write add workshop form event listener
13. work on drag and drop event listener
14. other stretch goals
