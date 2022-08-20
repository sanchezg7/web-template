# Pomodoro 
Powered by RxJS

# Docs
https://blog.angular-university.io/rxjs-higher-order-mapping/
https://rxjs.dev/api/index/function/switchMap
https://rxjs.dev/api/index/function/switchMap#example

# Higher Order Observables
https://blog.angular-university.io/rxjs-higher-order-mapping/
## Switch Map
Given two observables within the switchMap where observable 1 is emitting infinitely, When observable 2 gets emitted, Then observable 1 is unsubscribed and emissions from observable 2 are piped 

## MergeMap
Given two observables within a mergeMap where both observables are emitting infinitely and observable 1 and observable 2 are yielding a result, When the next emission from observable 2 happens, Then the mergeMap yields a result prior to awaiting the previous mergeMap intersection result to finish. 

# Tailwinds installation
https://tailwindcss.com/docs/installation
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init

# DaisyUI Installation
