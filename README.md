# TOPDELIVR

## A fictional company that pays its affiliates by the hour using the chimoney api The system is meant to allow admins to pay affiliates after logging in their hours. All you have to do is:

    1. Create an account if you don't have one or login if you do

    2. Once authenticated you're redirected to the dashboard where you can create a ticket using the `add ticket` button. ** Assuming you have registered as an affiliate **. If you register as an admin you have the ability to see all the created tickets and make a payment for all the tickets submitted.

## Installation

    1. Make sure you have node installed.

    2. Have `nuxi` installed. `Nuxi` is the Nuxt CLI (Command Line Interface) that will help you install and manage all the Nuxt ingredients.

    3. Clone the repository.

    4. cd into the root directory.

    5. `npm install` after navigating to the root directory.

    6. Create a `supabase` account and copy the `SUPABASE_URL`, `SUPABASE_KEY` and `DATABASE_URL`, and paste them into the env file.

    7. Generate a migration using `npx prisma migrate dev`and push the migration to production using `npx prisma db push`

    8. Create a chimoney developer account by navigating to the [chimoney readme documentation page](https://chimoney.readme.io/reference/sandbox-environment). Once here click on the `click here` link to take you to the portal. Login or create an account (make sure to verify your account if registering). Navigate to the developer section on the dashboard and create an app. Copy the `API key` and navigate to the `TopDelivr` app in the env file. Paste it in the `CHIMONEY_API_KEY` variable and your chimoney integration is complete. You have just created a testing environment to work with the API.

And Viola. You're set!
