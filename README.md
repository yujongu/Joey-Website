# Joey-Website
This is my personal website

## What I learned:
  Using bcrypt is super easy. Having salt round to 12, I was able to implement password encryption.
  
Authenticating was simple using bcrypt. However, I realized that using JWT for authentication reveals many threats
https://mannharleen.github.io/2020-03-19-handling-jwt-securely-part-1/ <br>
<sub>This website helped me learn the possible threats.</sub>

However, realizing I would never achieve perfect security, I simply stored JWT in local storage.<br>
***PLEASE DO NOT USE YOUR REAL PASSWORD WHEN SIGN UP***

카카오 지도 API 검색은 결과값이 카카오맵과 일치하지는 않는다. 하지만 정확한 키워드를 주면 같은 정보가 뜨는거 같다.<br>
