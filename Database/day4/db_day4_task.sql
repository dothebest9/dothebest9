#create database pethotel;
#use pethotel;
#고객(*1고객고유id,고객이름,비밀번호,이메일)
/*
create table customers (
    customer_id int auto_increment primary key ,
    customer_name varchar(50) not null,
    customer_phone varchar(11) not null,
    email varchar(30) unique not null
);


#반려동물(*2동물고유id,동물이름,동물종류,*1고객고유id)
create table pets(
	pet_id int auto_increment primary key ,
    pet_name varchar(20) not null,
    pet_type varchar(20) not null,
	customer_id int,
	foreign key (customer_id) references customers(customer_id)
);


#방(3방고유id,방번호,가격,주말가격)
create table rooms(
	room_id int auto_increment primary key ,
    room_num CHAR(50) not null unique,
	nomal_price decimal(10,2) not null,
    holi_price decimal(10,2) GENERATED ALWAYS AS (nomal_price * 1.2) STORED NOT NULL
);

*/

/*
#예약시스템(*4예약고유번호,*1고객고유id,*2동물고유id,*3방고유id,입실시각,퇴실시간,*5서비스고유id)
create table reservations(
	res_id int auto_increment primary key ,
    customer_id INT NOT NULL,
	pet_id int NOT NULL,
    room_id int NOT NULL,
    chk_in date not null,
    chk_out date not null,
    
    foreign key (pet_id) references pets(pet_id),
    foreign key (room_id) references rooms(room_id),
    foreign key (customer_id) references customers(customer_id)
);
*/
/*
#서비스(*5서비스고유id,서비스종류,서비스가격)
create table sevices (
	sevice_id int auto_increment primary key ,
	service_type varchar(30) not null,
    service_price decimal(10,2) not null
);
*/
#n:m관계만들기(연결고유id,*4예약고유번호,*5서비스고유id,서비스날짜,서비스한수량
create table res_services(
	res_svc_id int auto_increment ,
	res_id int NOT NULL,
    sevice_id int NOT NULL,
    service_date date,
    quantity int,
    
	PRIMARY KEY (res_svc_id),
    foreign key (res_id) references reservations(res_id),
    foreign key (sevice_id) references sevices(sevice_id)
);