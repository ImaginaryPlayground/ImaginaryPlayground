### SSAFY-WEB

###

#### 스켈레톤

```
"실시간 선호도 조사"은 투표를 통해 유저들끼리의 커뮤니티를 형성 할 수있는 가상의
주제로써 이 프로젝트를 통해 React, Node.js, Mysql, Hw등 다양한 기술을
접하는것을 목표로한다.
```

#### directory

```
/public
	/images
	-Vo_icon.png
-favicon.ico
-index.html
-logo192.png
-logo512.png
-manifest.json
-index.html
```

```
/src
	/common
	- CommonHooks.jsx                -> key press, local storage state
	- InfiniteScroll.jsx             -> handle infinite scroll
	- MediaQueryHooks.jsx            -> material-ui useMediaQuery hooks

	/components
		/Auth
			/SignResponsiveDialog        -> sigin in, sigin up, recover pw
		/Create
			/CreateVoteComponent         -> create a vote
			/DialogActionsComponet       -> create a vote
			/RadioButtonsGroup           -> create a vote
		/Feed                            -> vote feed
		/Grid
			/VoteGridItem                -> vote item
			/VoteGridList                -> vote root
			/VoteGridTitle               -> vote title
		/Main
			/ButtonBases                 -> category head
			/CheckBoxButtonsGroup        -> vote options
			/HorizontalBar               -> perceantage chart
			/VoteDetailResponsiveDialog  -> vote result
		/Search
			/SearchComponent             -> search vote
		/User
			/ChangePassword              -> change pw
			/MyInfo                      -> user info
			/UserResponsiveDialog        -> user dialog root
			/VerticalTabs                -> user dialog side nav

	/context                         -> create context

	/css                             -> reset css

	/layout
		/Drawer                        -> side nav
		/Footer                        -> footer
		/Header                        -> head nav
		/Layout                        -> layout root

	/pages
	- Auth                       -> user
	- AboutMe                    -> about me
	- ContactUs                  -> contact us
	- CreateVote                 -> create vote
	- MainVote                   -> vote
	- MyVote                     -> my vote
	- NotFound                   -> 404 page
	- SearchVote                 -> search
	- Terms                 	 -> terms
```

```
App.js
```

```
index.css
```

```
index.js
```

```
serviceWorker.js
```

```
package.json
```

```
README.md
```

#### run

```
npm install
npm start
```
