get '/' do
  erb :welcome
end

get '/api/v1/feed' do
  chromedriver_path = ENV['RACK_ENV'] == 'production' ? "/app/.chromedriver/bin/chromedriver" : File.join(File.absolute_path('../..', File.dirname(__FILE__)),"lib","chromedriver.exe")
  Selenium::WebDriver::Chrome.driver_path = chromedriver_path
  options = Selenium::WebDriver::Chrome::Options.new(args: ['headless'])
  driver = Selenium::WebDriver.for(:chrome, options: options)
  driver.get("https://twitter.com/search?q=asimaterials")
  tweets = driver.find_element(class_name: "stream-items").attribute("innerHTML")
  driver.get("https://www.instagram.com/explore/tags/asimaterials/")
  posts = []
  driver.find_elements(class_name: "_4rbun").each do |element|
    posts.push(element.attribute("innerHTML"))
  end
  response = {
    twitter_html: tweets,
    instagram_html: posts
  }
  return response.to_json
end
