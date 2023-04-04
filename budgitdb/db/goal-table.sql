-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: budgitdb
-- ------------------------------------------------------
-- Server version	8.0.32

USE `budgitdb`;


Drop table if exists goal;

create table goal(

goalId int not null auto_increment,
title varchar(256) not null,
savings double not null default 1,
startingAmount double not null default 0.0,
startDate date not null,
endDate date not null,
description varchar(256),
primary key(goalId)
);

