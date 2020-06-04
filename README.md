
# Mainichi Tracker

Mainichi is a account register that user can create different bank account and adding transactions to the specific account. It help user to be able to keep track on what they have spent on and is an extra check to compare with bank statements.


## Dependecies

- express
- body-parser
- mongoose
- ejs
- method-override
- connect-mongo
- express-session
- bcrypt

## Models
- The Account model will contain the ability of create, retrieve, update, and delete. (Full CRUD)
- The Transaction model will be able to be edited, updated and deleted
- The User model is mainly to be able to create a user, and referencing with accounts.

## WireFrames

### Home Route
![](WireFrame/homeRoute.png)
### All Account List
![](WireFrame/indexRoute.png)
### Specific Account Show Route
![](WireFrame/showRoute.png)
### Edit Acct Info route
![](WireFrame/editRoute.png)
### Create acct route
![](WireFrame/createRoute.png)
### Add New Transaction Route
![](WireFrame/newTransaction.png)
### Update Transaction Route
![](WireFrame/editTransaction.png)
### Register Route
![](WireFrame/register.png)
### Login Route
![](WireFrame/login.png)


# MVP
- Able to create account
- Able to show the account
- Able to edit an account
- Able to delete an account
- Able to create a Transaction
- Able to delete a transaction
- Able to update or edit an transaction
- Able to reflect the transaction amount into the account balance
- Can edit the transaction and still able to reflect the correct account balance
- Can show the transaction history in the show route of the specific account correlated to
- Once delete the account it will delete all transaction
- Once delete a specific transaction it will reflect and change the account balance


## Stretch Goal
- Create the regiter and login option(checked)
- Referencing Auth or User with Account so it will only show the use the account he or she created only (checked)
- Make the data table to be sortable and filterable (not check)


## License
* MIT