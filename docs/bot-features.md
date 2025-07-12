# Lightning Wallet Discord Bot - Features Documentation

## Information
> The Lightning Wallet Discord Bot is a public discord bot, supporting both _guild installed_ and _user installed_ applications.

The Lightning Wallet Discord Bot (LNWallet Bot) utilized the [Speed Wallet](https://links.speed.app/referral?referral_code=G616LL) as a base (for the deposit and withdraw system).

`⚠️` This heavily in development, I may add new features or remove features, it all depends on the feature itself and how well it is with discord—in other words, this is not the complete list.

## Wallets
> The following list of wallets is what we provide and fully support, those are what were **fully** tested, anything else may contain **additional unforeseen issues**, those issues can vary from internal errors within the code, additional fees that I may have to pay and much more.

1. [Speed Wallet](https://links.speed.app/referral?referral_code=G616LL)
   - @speed.app
   - @tryspeed.com

Should you be interested in a specific wallet, please suggest it, I will be fully testing it.
~~Wallets that are planned on being added~~ This is a work in progress section, please allow me some time to first develop the bot fully before you start suggesting, thank you.

## Commands
> The Lightning Wallet Discord Bot will contain all the inherited commands from any other available discord bot with additional features to benefit the users and the bot.

Before proceeding with the commands, a user must register, by reading Lightning Wallet Discord Bot's Terms of Service and Privacy Policy (simply briefed on discord), and then select the available wallets we provide.

## Global Commands
> These commands are available for both _guild-installed_ and _user-installed_ applications.

### User Profile (`/profile`)
> The Lightning Wallet Discord Bot will contain user profile, to view, statistics, and additional information for himself and to the public.

Sub-Commands:
1. view (optional: user)
   
   view yours or another user's profile
   
   restriction: should a user's profile be private, other users will receive no details about the user.
   
   non-registered: non registered users shall not be able to be viewed but instead errored ("Sorry, this user has not registered on our bot").
   
   view: viewing your, or another user's profile, shall contain the following data:
	1. User Level & XP
	2. User Satoshi, USDT, USDC Amount
	3. User Statistics (Earned, Given Away (tip, drop, mine-drop, etcetera), Deposited, Withdrew)
	4. Speed Wallet Address
	
	Should a user be viewing themself, buttons they can seen:
	- Level
	  view levels & claim rewards
	- Subscriptions
	  view subscriptions & manage them
	
	Should a user not be viewing themself, buttons can they seen:
	- Donate
	  ability to donate a certain amount to the user 

2. manage
   
   a user may manage their profile
   
   available settings:
	1. Profile View: Public, Hidden.
	2. Withdrawal Address: Change withdrawal address.
	3. Friend Requests: Allowed, Disallowed—can another user send you a friend request? Y/N.
	4. Friend Request DMs: Allowed, Disallowed—if the bot should notify the user of someone sending him a friend request.
	5. Delete Profile: Permanently Deletes the user profile.
	6. Block Edits:
	   
	   Ability to decide what the blocked users can do and can't do (earn from rain, participate in mine-drop, etcetera).
	   
	   Ability to decide should the user be able to receive Satoshi, USDT or USDC from the blocked user's rain, ability to participate in mine-drop, etcetera (checking if the user is blocked is of higher priority to this).
	   
	   Ability to decide what the block message is when a blocked user:
		1. attempts to claim a mine-drop
		2. attempts to claim a red-packet
		3. attempts to join a drop
		4. etcetera.

`⚠️` Notice: Ability to decide what the block message is, is purchasable through the store.

### Withdraw (`/withdraw`)
> The Lightning Wallet Discord Bot will contain withdrawal ability, ensuring a user can safely withdraw to their speed wallet address.

Sub-Commands:
1. satoshi
   
   Sub-Sub-Commands:
	1. everything
	   
	   withdraws all possible Satoshi (following the withdrawal limit of the user) to the address that was set by the user.
	2. specific \[required: number—amount\]
	   
	   withdraws specific amount of Satoshi (following the withdrawal limit of the user) to the address that was set by the user.
2. usdt
   
   Sub-Sub-Commands:
	1. everything
	   
	   withdraws all possible USDT (following the withdrawal limit of the user) to the address that was set by the user.
	2. specific \[required: number—amount\]
	   
	   withdraws specific amount of USDT (following the withdrawal limit of the user) to the address that was set by the user.
3. usdc
   
   Sub-Sub-Commands:
	1. everything
	   
	   withdraws all possible USDC (following the withdrawal limit of the user) to the address that was set by the user.
	2. specific \[required: number—amount\]
	   
	   withdraws specific amount of USDC (following the withdrawal limit of the user) to the address that was set by the user.

### Deposit (`/deposit`)
> The Lightning Wallet Discord Bot will contain deposit ability, ensuring a user can deposit into their bot balance.

`⚠️` The invoice will be valid for a small amount of time (10minutes).

Sub-Commands:
1. satoshi \[required: number—amount\]
   
   sends a **Lightning Invoice** and a **QR Code**, generated for the specific amount of Satoshi (minimum: 1, maximum: 1,000,000).
2. usdt \[required: number—amount\]
   
   sends a **Lightning Invoice** and a **QR Code**, generated for the specific amount of USDT (minimum: 0.001, maximum: 1,000).
3. usdc \[required: number—amount\]
   
   sends a **Lightning Invoice** and a **QR Code**, generated for the specific amount of USDC (minimum: 0.001, maximum: 1,000).

### Block (`/block`)
> The Lightning Wallet Discord Bot will contain blocking, unblocking and the listing of blocked users, ensuring the user can maximize his max safety.

Sub-Commands:
1. list
   
   list all available blocked users, paginated.
2. add \[required: user—user\]
   
   add a user to the blocked list.
3. remove \[required: Auto-Complete—user\]
   
   remove a user from the blocked list.

`⚠️` Notice: There is no limit on the amount of blocked users, however, there is a cooldown of 5 seconds between each block add, list and remove, to prevent overwhelming the database.

### Friend (`/friend`)
> The Lightning Wallet Discord Bot will contain friends, a way to promote friendship and advertise where people are hosting rains, drops, mini-drops, red-packets, trivia, etcetera.

`⚠️` Notice: This is still experimental, and may change, but the concept will be kept unless we are limited by discord (_user-installed_ applications are affected by this). There will be a limited amount of friends, increasing is available through the store, default is at 25 friends, and, there will be a limited amount of incoming friend requests, which will be capped at 250 friend requests.

Sub-Commands:
1. list
   
   list all added friends, paginated.
2. remove \[required: Auto-Complete—user\]
   
   removes a user from the friend list, and notifies them if possible.
3. block
   Sub-Sub-Commands:
	1. list
	   
	   list all blocked users, those users will not be able to send friend request to the user.
	2. add \[required: Auto-Complete—user]
	   
	   add a user to the blocked users list.
	3. remove \[required: user—user\]
	   
	   removes a user from the blocked users list.
4. request
   
   Sub-Sub-Commands:
	1. sent
	   
	   list all sent friend requests, paginated.
	2. received
	   
	   list all received friend requests, paginated.
	3. accept \[required: Auto-Complete—user]
	   
	   accept a friend request, and notifies them if possible.
	4. deny \[required: Auto-Complete—user]
	   
	   deny a friend request, and notifies them if possible.
	5. send \[required: user—user\]
	   
	   send a request to a user.
	6. remove \[required: Auto-Complete—user\]
	   
	   remove a request sent to a user.

### Bot (`/bot`)
> The Lightning Wallet Discord Bot will contain bot information.

Sub-Commands:
1. ping
   
   view the bot ping to discord and to the database.
2. statistics
   
   view the statistics of the bots (withdraws made, deposits made, the amount that was withdrawn and deposited)
3. information
   
   view the information of the bot (uptime, bot details, system information).

### Code (`/code`)
> The Lightning Wallet Discord Bot will contain a code generation and redeemable system.

Sub-Commands:
1. generate
   Sub-Sub-Commands:
	1. satoshi \[required: number—amount\] (optional: duration) (optional: uses)
	   
	   generate a redeemable code with a specific amount of Satoshi (minimum: 5, maximum: 10,000), should duration be provided, the code will be available for that long, default is infinite, the duration length will be minimum 10 minutes and maximum 30 days, should uses be provided, it will override the default value of 1 to be the amount of usage, minimum being 1, maximum being 100.
	2. usdt \[required: number—amount\] (optional: duration) (optional: uses)
	   
	   generate a redeemable code with a specific amount of USDT (minimum: 0.005, maximum: 10), should duration be provided, the code will be available for that long, default is infinite, the duration length will be minimum 10 minutes and maximum 30 days, should uses be provided, it will override the default value of 1 to be the amount of usage, minimum being 1, maximum being 100.
	3. usdc \[required: number—amount\] (optional: duration) (optional: uses)
	   
	   generate a redeemable code with a specific amount of USDC (minimum: 0.005, maximum: 10), should duration be provided, the code will be available for that long, default is infinite, the duration length will be minimum 10 minutes and maximum 30 days, should uses be provided, it will override the default value of 1 to be the amount of usage, minimum being 1, maximum being 100.
2. redeem \[required: string—code\]
   
   redeem a redeemable code .
3. list
   
   list all codes (active, claimed).

### Store (`/store`)
> The Lightning Wallet Discord Bot will contain a store system, to allow users purchasing locked features and roles (for _guild-installed_ applications).

`⚠️` Notice: There will be 2 different types, as we have _user-installed_ and _guild-installed_, some guilds may not have the discord bot, which unfortunately means we need to first check if the bot is on the discord server in a way, and then see if there is products.

#### User-Installed Application
> _User-Installed_ includes but does not limit to Direct Messages, as this command is available in Direct Messages, we will need to make sure that this works properly, or issues may occur.

##### Products
> All products are, with no exception, permanent. I do not have any intentions to do monthly products, however, this may change, should I receive good product suggestion to be subscription based.

Some products are tiered, there may be a max tier cap to ensure fairness.

Those tiered product price are based on the 1st tier, for the 3rd tier upgrade, it would be tier 3 - tier 2 = amount to upgrade.

1. Increase Amount You Withdraw Per Day
   
   `⚠️` This product has a max tier of 15.
   
   `⚠️` There is 3 products here combined, in other words, Satoshi has their own 15 Tiers, USDT has their own 15 Tiers and USDC has their own 15 Tiers, they were combined for easy reading.

| Tier | Cap (Satoshi) | Cap (USD—t/c) | Price (Satoshi) | Price (USD) |
| ---- | ------------- | ------------- | --------------- | ----------- |
| 1    | 1,000         | 1             | Free            | Free        |
| 2    | 2,000         | 2             | 25              | 0.025       |
| 3    | 3,000         | 3             | 50              | 0.05        |
| 4    | 4,000         | 4             | 75              | 0.075       |
| 5    | 5,000         | 5             | 100             | 0.1         |
| 6    | 6,000         | 6             | 125             | 0.125       |
| 7    | 7,000         | 7             | 150             | 0.15        |
| 8    | 8,000         | 8             | 175             | 0.175       |
| 9    | 9,000         | 9             | 200             | 0.2         |
| 10   | 10,000        | 10            | 225             | 0.225       |
| 11   | 11,000        | 11            | 250             | 0.25        |
| 12   | 12,000        | 12            | 275             | 0.275       |
| 13   | 13,000        | 13            | 300             | 0.3         |
| 14   | 14,000        | 14            | 325             | 0.325       |
| 15   | 15,000        | 15            | 350             | 0.35        |

2. Decrease Withdrawal Cooldown
   
   `⚠️` This product has a max tier of 7.
   
| Tier | Time       | Price (Satoshi) | Price (USD) |
| ---- | ---------- | --------------- | ----------- |
| 1    | 60 minutes | Free            | Free        |
| 2    | 55 minutes | 35              | 0.035       |
| 3    | 50 minutes | 70              | 0.07        |
| 4    | 45 minutes | 105             | 0.105       |
| 5    | 40 minutes | 140             | 0.14        |
| 6    | 35 minutes | 175             | 0.175       |
| 7    | 30 minutes | 210             | 0.21        |

3. Increase Amount Of Friends You Can Accept
   
   `⚠️` This product has a max tier of 9.

| Tier | Cap | Price (Satoshi) | Price (USD) |
| ---- | --- | --------------- | ----------- |
| 1    | 25  | Free            | Free        |
| 2    | 50  | 15              | 0.015       |
| 3    | 75  | 30              | 0.03        |
| 4    | 100 | 45              | 0.045       |
| 5    | 125 | 60              | 0.06        |
| 6    | 150 | 75              | 0.075       |
| 7    | 175 | 90              | 0.09        |
| 8    | 200 | 105             | 0.105       |
| 9    | 225 | 120             | 0.125       |
| 10   | 250 | 135             | 0.135       |

#### Server
> Server includes the _user-installed_ application, thus allowing the purchase of roles (subscription, one-time).

`⚠️` Notice: It is impossible to do channel permission, channels are capped at 1,000 (roles + members) unfortunately.

Server Roles will be, currently, the only available option, I will not be taking any fee from this, however, there will be an administrator store to increase the amount of roles a server can sell.
The default allowed will be 3 roles, an administrator can decide what the price amount is, if it is permanently or monthly, if there is monthly subscription, it can be up to yearly, and shall it be yearly, there can also be discounts should the server administrator be interested.

##### Administrator
> Administrator products are for server administrators—those who have the administrator role permission on the server. Administrators use the server balance when making these purchases.

###### Products
> All products are, with no exception, permanent. I do not have any intentions to do monthly products, however, this may change, should I receive good product suggestions to be subscription based.

Some products are tiered, there may be a max tier cap to ensure fairness.

Those tiered product price are based on the 1st tier, for the 3rd tier upgrade, it would be tier 3 - tier 2 = amount to upgrade.

1. Increase Sellable Roles
   
   `⚠️` This product has a max tier of 5.

| Tier | Amount | Price (Satoshi) | Price (USD) |
| ---- | ------ | --------------- | ----------- |
| 1    | 3      | Free            | Free        |
| 2    | 6      | 50              | 0.05        |
| 3    | 9      | 100             | 0.1         |
| 4    | 12     | 150             | 0.15        |
| 5    | 15     | 200             | 0.2         |

2. Thank You Message
   
   `⚠️` This product is not tiered.
   
   This product allows the administrators to set a thank you message when a buyer purchasing a server product (roles).

| Satoshi | USD  |
| ------- | ---- |
| 250     | 0.25 |

## Guild Commands
> These commands are available for _guild-installed_ application only.

### Tip (`/tip`)
> The Lightning Wallet Discord Bot will contain a tipping system, which provides the ability to tip a specific person a specific amount.

Sub-Commands:
1. satoshi \[required: user—user\] \[required: number—amount\]
   
   tip a specific user a specific amount of Satoshi (minimum: 1).
2. usdt \[required: user—user\] \[required: number—amount\]
   
   tip a specific user a specific amount of USDT (minimum: 0.001).
3. usdc \[required: user—user\] \[required: number—amount\]
   
   tip a specific user a specific amount of USDC (minimum: 0.001).

### Drop (`/drop`)
> The Lightning Wallet Discord Bot will contain a drop system, which provides the ability to drop a specific amount that splits rewards between all participants.

Sub-Commands:
1. satoshi \[required: number—amount\] (optional: duration) (optional: description)
   
   drop a specific amount of Satoshi (minimum: 10) for a duration (default: 1minute, minimum: 15 seconds, maximum: 24 hours) with a description (if no description, there will be no description added).
2. usdt \[required: number—amount\] (optional: duration) (optional: description)
   
   drop a specific amount of USDT (minimum: 0.01) for a duration (default: 1minute, minimum: 15 seconds, maximum: 24 hours) with a description (if no description, there will be no description added).
3. usdc \[required: number—amount\] (optional: duration) (optional: description)
   
   drop a specific amount of USDC (minimum: 0.01) for a duration (default: 1minute, minimum: 15 seconds, maximum: 24 hours) with a description (if no description, there will be no description added).

### Mine-Drop (`/minedrop`)
> The Lightning Wallet Discord Bot will contain a mine-drop system, allowing users to enjoy the mini-game service that we provide.

Sub-Commands:
1. satoshi \[required: number—amount\] (optional: duration)
   
   drop a 5x5 grid mine which consists of bombs and Satoshi (minimum: 1, maximum: 5,000), should duration (minimum: 15 seconds, maximum: 24 hours) be specified, the mine-drop will then be available for that specific duration, otherwise, it will exist forever.
2. usdt \[required: number—amount\] (optional: duration)
   
   drop a 5x5 grid mine which consists of bombs and USDT (minimum: 0.001, maximum: 5), should duration (minimum: 15 seconds, maximum: 24 hours) be specified, the mine-drop will then be available for that specific duration, otherwise, it will exist forever.
3. usdc \[required: number—amount\] (optional: duration)
   
   drop a 5x5 grid mine which consists of bombs and Satoshi (minimum: 0.001, maximum: 5), should duration (minimum: 15 seconds, maximum: 24 hours) be specified, the mine-drop will then be available for that specific duration, otherwise, it will exist forever.

### Red-Packet (`/redpacket`)
> The Lightning Wallet Discord Bot will contain a red-packet system, thus allowing a 1-time claimable (first come, first served) reward.

Sub-Commands:
1. satoshi \[required: number—amount\]
   
   sends a red-packet in chat with a specific amount of Satoshi (minimum: 1, maximum: 15,000).
2. usdt \[required: number—amount\]
   
   sends a red-packet in chat with a specific amount of USDT (minimum: 0.001, maximum: 15).
3. usdc \[required: number—amount\]
   
   sends a red-packet in chat with a specific amount of USDC (minimum: 0.001, maximum: 15).

### Rain (`/rain`)
> The Lightning Wallet Discord Bot will contain a raining system, allowing people to rain a specific amount for a a specific amount of users, be it split or per person.

Sub-Commands:
1. satoshi \[required: number—amount\] \[required: number—users\] \[required: boolean—equal\]
   
   rains a specific amount of Satoshi to a specific amount of users (minimum: 1, maximum: 250), should equal be true, each user will get the exact amount of Satoshi rained, otherwise, it will be split between all of them.
2. usdt \[required: number—amount\] \[required: number—users\] \[required: boolean—equal\]
   
   rains a specific amount of USDT to a specific amount of users (minimum: 1, maximum: 250), should equal be true, each user will get the exact amount of USDT rained, otherwise, it will be split between all of them.
3. usdc \[required: number—amount\] \[required: number—users\] \[required: boolean—equal\]
   
   rains a specific amount of USDC to a specific amount of users (minimum: 1, maximum: 250), should equal be true, each user will get the exact amount of USDC rained, otherwise, it will be split between all of them.

### Server (`/server`)
> The Lightning Wallet Discord Bot will contain a server system, dedicated for the users to view the server information.

The server information contain:
1. Server Balance (Satoshi, USDT, USDC)
2. Server Details (Owner, Creation Date)
3. Server Level
4. Boost Level 
5. Server Rank

Buttons:
- Donate
  
  ability to donate to the server
- Boost
  
  ability to boost the server
- {if server administrator or server owner, reply to original message in ephemeral with button} Configurate.
- {if server administrator or server owner, reply to original message in ephemeral with button} Level Rewards.
- {if server administrator or server owner, reply to original message in ephemeral with button} Transcripts.
- {if server owner, reply to original message in ephemeral with button} Withdraw.

#### Configurate (Button)
> The configurate button is only available for the server administrators and the server owner. It plays a powerful role in managing the server.

The server configuration contains:

1. {if server level 2 or higher} Booster's Role
2. Audit logs channel
3. Store Information (balance, amount of roles / max amount of roles, )

Buttons:

- {if server level 2 or higher} Booster Role (not clickable)
- {if server level 2 or higher && boost role not set} Set
- {if server level 2 or higher && boost role set} Edit
- {if server level 2 or higher && boost role set} Remove
- Audit Logs (not clickable)
- {if audit logs channel not set} Set
- {if audit logs channel set} Edit
- {if audit logs channel set} Remove
- Store (not clickable)
- {if store not enabled} Enable
- {if store enabled} Disable
- {if store enabled} Roles (not clickable)
- {if store enabled && not maxed out on roles} Create
- {if store enabled && has roles} Modify

#### Level Rewards (Button)
> The level rewards button is only available for the server administrators and the server owner. The base role is to be able to claim level rewards.

Embed containing:

	Title: **Server Level**

	Field:
		Name: **`🧪` XP Progression**
		Value:
			Current Level: {level}  
			XP: {earned}{if not maxed level: "/{total}"}  
			{if maxed: "This server has reached the max level"}  

	Field:
		Name: **`🎁` Level Rewards**
		Value:
			Level {level} — (Claimed\|Unclaimed\|Locked)  

Should there be an available claimable reward, there will be a "Claim Reward{if multiple rewards: "s"}" button.

#### Withdraw (Button)
> The withdraw button is only available for the server owner. The base role of this command is to allow the server owner to withdraw to their own user balance.

## User Commands
> These commands are available for the _user-installed_ application only.

### Transaction (`/transaction`)
> The Lightning Wallet Discord Bot will contain a transaction system, thus allowing users to view their previous transactions

Embed containing:

	Title: **Your Transactions — Overview**

	Field:
		Name: **Satoshi**
		Value:
			> Withdrawn: {amount}  
			> Deposit: {amount}  
			> {if tip sent higher than 0} Tip{if amount higher than 1: "s"} Sent: {amount}  
			> {if tip received higher than 0} Tip{if amount higher than 1: "s"} Received: {amount}  
			> {if rain sent higher than 0} Rain{if amount higher than 1: "s"} Sent: {amount}  
			> {if rain received higher than 0} Rain{if amount higher than 1: "s"} Received: {amount}  
			> {if drop sent higher than 0} Drop{if amount higher than 1: "s"} Sent: {amount}  
			> {if drop received higher than 0} Drop{if amount higher than 1: "s"} Received: {amount}  
			> {if mini-drop sent higher than 0} Mini-Drop{if amount higher than 1: "s"} Sent: {amount}  
			> {if mini-drop received higher than 0} Mini-Drop{if amount higher than 1: "s"} Received: {amount}  
			> {if red-packet sent higher than 0} Red-Packet{if amount higher than 1: "s"} Sent: {amount}  
			> {if red-packet received higher than 0} Red-Packet{if amount higher than 1: "s"} Received: {amount}  

	Field:
		Name: **USDT**
		Value:
			> Withdrawn: {amount}  
			> Deposit: {amount}  
			> {if tip sent higher than 0} Tip{if amount higher than 1: "s"} Sent: {amount}  
			> {if tip received higher than 0} Tip{if amount higher than 1: "s"} Received: {amount}  
			> {if rain sent higher than 0} Rain{if amount higher than 1: "s"} Sent: {amount}  
			> {if rain received higher than 0} Rain{if amount higher than 1: "s"} Received: {amount}  
			> {if drop sent higher than 0} Drop{if amount higher than 1: "s"} Sent: {amount}  
			> {if drop received higher than 0} Drop{if amount higher than 1: "s"} Received: {amount}  
			> {if mini-drop sent higher than 0} Mini-Drop{if amount higher than 1: "s"} Sent: {amount}  
			> {if mini-drop received higher than 0} Mini-Drop{if amount higher than 1: "s"} Received: {amount}  
			> {if red-packet sent higher than 0} Red-Packet{if amount higher than 1: "s"} Sent: {amount}  
			> {if red-packet received higher than 0} Red-Packet{if amount higher than 1: "s"} Received: {amount}  

	Field:
		Name: **USDC**
		Value:
			> Withdrawn: {amount}  
			> Deposit: {amount}  
			> {if tip sent higher than 0} Tip{if amount higher than 1: "s"} Sent: {amount}  
			> {if tip received higher than 0} Tip{if amount higher than 1: "s"} Received: {amount}  
			> {if rain sent higher than 0} Rain{if amount higher than 1: "s"} Sent: {amount}  
			> {if rain received higher than 0} Rain{if amount higher than 1: "s"} Received: {amount}  
			> {if drop sent higher than 0} Drop{if amount higher than 1: "s"} Sent: {amount}  
			> {if drop received higher than 0} Drop{if amount higher than 1: "s"} Received: {amount}  
			> {if mini-drop sent higher than 0} Mini-Drop{if amount higher than 1: "s"} Sent: {amount}  
			> {if mini-drop received higher than 0} Mini-Drop{if amount higher than 1: "s"} Received: {amount}  
			> {if red-packet sent higher than 0} Red-Packet{if amount higher than 1: "s"} Sent: {amount}  
			> {if red-packet received higher than 0} Red-Packet{if amount higher than 1: "s"} Received: {amount}  

Buttons:
- Transactions (not clickable)
- {if current page is not Overview} Overview
- {if current page is not Satoshi} Satoshi
- {if current page is not USDT} USDT
- {if current page is not USDC} USDC

## Level System
> The Lightning Wallet Discord Bot rewards users with cryptocurrency (Satoshi) based on store purchase milestones.

### User
#### Progression & Rewards
> Rewards are granted _after_ reaching the next level, not upon simply attaining the level itself. For users at the maximum level, the system properly recognizes that they have reached the top and handles rewards accordingly.

| Level | Requirement | Reward | Total Rewards |
| ----- | ----------- | ------ | ------------- |
| 1     | 2 products  | 25     | 25            |
| 2     | 4 products  | 50     | 75            |
| 3     | 6 products  | 75     | 150           |
| 4     | 8 products  | 100    | 250           |
| 5     | 10 products | 125    | 375           |

### Server
> The Lightning Wallet Discord Bot rewards servers with cryptocurrency (Satoshi) based on store purchase milestones.

#### Progression & Rewards
> Rewards are granted _after_ reaching the next level, not upon simply attaining the level itself. For servers at the maximum level, the system properly recognizes that they have reached the top and handles rewards accordingly.

| Level | Requirement | Reward | Total Rewards |
| ----- | ----------- | ------ | ------------- |
| 1     | 2 products  | 25     | 25            |
| 2     | 4 products  | 50     | 75            |
| 3     | 6 products  | 75     | 150           |

## Boost System (Servers)
> The boost system works as a support for the server, both in advertising and financially.

`⚠️` Notice: To be able to boost a server, the server must be at the very least level 2.

The boost system is a way to support a server financially through community effort, the prices are set by me, as this is a boost system, that means it's a monthly subscription, the booster could potentially earn a role reward, should the server administrators have configurated that.

### Pricing
> The boost system contains 1 and only 1 subscription product.
 
| TimeFrame | Naming        | Pricing (Satoshi) | Pricing (USD) | Discount (%) | Platform Cut (%) |
| --------- | ------------- | ----------------- | ------------- | ------------ | ---------------- |
| 1 Month   | Monthly       | 1,000             | 1             | —            | 20               |
| 3 Months  | Quaterly      | 2,850             | 2.85          | 5            | 17.5             |
| 6 Months  | Semi-Annually | 5,280             | 5.28          | 12           | 15               |
| 1 Year    | Anually       | 9,600             | 9.6           | 20           | 12.5             |

## Offers System
> This is still work in progress, and, may not even be made, it all depends on the 3rd party advertisers, if they pay out in cryptocurrency, to be specific, stable coins (USDT, USDC).
> 
> The idea is to make servers earn from this, as it would be a server feature, thus allowing a per-server command feature.

## Voting System
> This is still work in progress, and, may not even be made, it all depends on the 3rd party advertisers, if they accept us. Rewards for the voting system consists of case key, a case contains cryptocurrency (Satoshi, USDT, USDC).

### Case System
> The case system was made for only voting, no gambling or anything that is deemed as gambling, you vote, you earn, the reward is randomly selected.
> We will be using the Counter-Strike 2 case system as a preview (pre-selected results).

#### Rewards
> The rewards consists of cryptocurrency (Satoshi, USDT, USDC), with minimum and maximum.

##### Currency
> The currency is first that must be drawn before moving to what the prize amount is. 

`⚠️` Notice: Global Reward Limits: All **global limits per day and per month** are currently **experimental** and may be **adjusted (increased or decreased)** at any time based on bot usage patterns, abuse prevention, or balancing needs.

##### Satoshi

| Amount        | Chance (%) | Global Limit per Day | Global Limit per Month   |
| ------------- | ---------- | -------------------- | ------------------------ |
| 1             | 50         | —                    | —                        |
| 2             | 22         | —                    | —                        |
| 3             | 15         | —                    | —                        |
| 4             | 5.6        | 50                   | —                        |
| 5             | 2.5        | 30                   | —                        |
| 6             | 1.25       | 25                   | —                        |
| 7             | 1          | 20                   | —                        |
| 8             | 0.75       | 15                   | —                        |
| 9             | 0.6        | 10                   | —                        |
| 10            | 0.4        | 5                    | —                        |
| 20            | 0.3        | 4                    | —                        |
| 30            | 0.2        | 3                    | —                        |
| 50            | 0.1        | 2                    | —                        |
| 100           | 0.045      | 1                    | —                        |
| Special Prize | 0.005      | 1                    | (depends on the month)\* |

\* Should the month be 28 days, it will be 28 global monthly limit, otherwise, if it is 30 days, it ill be 30 global monthly limit.

##### USD(T/C)

| Amount        | Chance (%) | Global Limit per Day | Global Limit per Month   |
| ------------- | ---------- | -------------------- | ------------------------ |
| 0.001         | 50         | —                    | —                        |
| 0.002         | 22         | —                    | —                        |
| 0.003         | 15         | —                    | —                        |
| 0.004         | 5.6        | 50                   | —                        |
| 0.005         | 2.5        | 30                   | —                        |
| 0.006         | 1.5        | 25                   | —                        |
| 0.007         | 1          | 20                   | —                        |
| 0.008         | 0.75       | 15                   | —                        |
| 0.009         | 0.6        | 10                   | —                        |
| 0.01          | 0.4        | 5                    | —                        |
| 0.02          | 0.3        | 4                    | —                        |
| 0.03          | 0.2        | 3                    | —                        |
| 0.05          | 0.1        | 2                    | —                        |
| 0.1           | 0.045      | 1                    | —                        |
| Special Prize | 0.005      | 1                    | (depends on the month)\* |

\* Should the month be 28 days, it will be 28 global monthly limit, otherwise, if it is 30 days, it ill be 30 global monthly limit.

##### Special Prize
`⚠️` Notice: The special prize amounts listed are preliminary and subject to change. The final amounts will be adjusted based on fluctuations in Bitcoin prices and other relevant factors. We aim to ensure that the special prize remains attractive and aligned with market conditions.

###### Satoshi

| Amount | Chance (%) | Global Limit per Month |
| ------ | ---------- | ---------------------- |
| 500    | 75         | 15                     |
| 600    | 10         | 8                      |
| 700    | 7          | 5                      |
| 800    | 5          | 3                      |
| 900    | 2          | 2                      |
| 1,000  | 1          | 1                      |

###### USD(T/C)

| Amount | Chance (%) | Global Limit per Month |
| ------ | ---------- | ---------------------- |
| 0.5    | 75         | 15                     |
| 0.6    | 10         | 8                      |
| 0.7    | 7          | 5                      |
| 0.8    | 5          | 3                      |
| 0.9    | 2          | 2                      |
| 1      | 1          | 1                      |
