# vue-manager-express
一个基于Express、MongoDB、Vue的后台管理系统

## 功能
后台基于express，前端基于vue和element-ui

后端实现jwt权鉴，支持信息的增删改查，分页及删选，权限控制

## 启动
cd express-server && yarn install && yarn run server

cd vue-client && yarn install && yarn run server

建议按照commit来进行参考

## 接口

默认后端为 http://localhost:3000/api

#### /users/register
POST，注册，传入{name, email, password, identity}

#### /users/login
POST，登录，传入{email, password}

#### /profiles/add
POST，新增信息,传入{type,describe,income,expend,cash,remark}

#### /profiles/edit/
POST，更新信息，传入更新内容

#### /profiles/delete/
POST，删除信息，传入id

#### /profiles
GET，请求所有信息