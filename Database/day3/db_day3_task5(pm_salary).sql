#select name from employees where position = 'pm' ;#PM 직책을 가진 모든 직원결과
#SET SQL_SAFE_UPDATES = 0;#세이프모드비활성화
#update employees set salary =90000/10+90000 where position='pm'#PM 직책을 가진 직원의 연봉을 10% 인상
select name, salary from employees where position = 'pm';#PM 직책을 가진 직원의 연봉을 10% 인상한 후 그 결과