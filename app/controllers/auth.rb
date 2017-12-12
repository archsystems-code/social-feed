get '/' do
  erb :welcome
end

get '/feed' do
  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = "LbfLdXaUaKeqtKm4AR4mSiHtB"
    config.consumer_secret     = "lItuxkAqx20xTIZVbNMWzHlZj7NzXXawx4PWJMmp1C8rDoL8JL"
    config.access_token        = "115142857-xvjmzCs1aWenj87eVfp8tUUL8RZKHVnByeQrmFkN"
    config.access_token_secret = "g9Evaj69qiES8t95dllO4KqNoybMye8OAaN0dfLA0s7AA"
  end
  binding.pry
  
end

get '/signup' do
  
end
