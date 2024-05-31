FROM nginx:alpine
RUN rm /etc/nginx/nginx.conf
COPY build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


# 로컬(Local)에서 npm run build 실행 후
# github에 build 폴더까지 업로드
# 해당 build 폴더를 AWS EC2 t2-micro에 반영 
# (t2-micro가 너무 최소사양이다 보니 npm run build, npm install 하면 메모리가 터져버림 그래서 이렇게 진행)
# 로컬에서 npm run build 돌리때 build 폴더에 반영되는 .env 환경변수는 해당 로컬의 .env 파일 안에 있는 환경변수 값들임 

# docker build -t lottomap:latest .
# docker build --no-cache -t lottomap:latest .
# docker run -d -p 80:80 --name lottomap lottomap:latest