get '/' do
  erb :welcome
end

get '/api/v1/feed' do
  chromedriver_path = ENV['RACK_ENV'] == 'production' ? "/app/.chromedriver/bin/chromedriver" : File.join(File.absolute_path('../..', File.dirname(__FILE__)),"lib","chromedriver.exe")
  Selenium::WebDriver::Chrome.driver_path = chromedriver_path
  options = ENV['RACK_ENV'] == 'production' ? Selenium::WebDriver::Chrome::Options.new(args: ['headless'], binary: "/app/.apt/usr/bin/google-chrome") : Selenium::WebDriver::Chrome::Options.new(args: ['headless'])
  driver = Selenium::WebDriver.for(:chrome, options: options)
  driver.get("https://twitter.com/search?q=asimaterials")
  posts = []
  driver.find_elements(class_name: "js-stream-item").each do |element|
    post = ""
    begin
      post += element.find_element(class_name: "js-tweet-text-container").attribute("innerHTML")
      post += element.find_element(class_name: "AdaptiveMedia-photoContainer").attribute("innerHTML")
    rescue Selenium::WebDriver::Error::NoSuchElementError
      puts "No such element"
    else
      posts.push(post)
    end
  end
  driver.get("https://www.instagram.com/explore/tags/asimaterials/")
  driver.find_elements(class_name: "KL4Bh").each do |element|
    posts.push(element.attribute("innerHTML"))
  end
  driver.quit
  response = { posts: posts.shuffle }
  return response.to_json
end
