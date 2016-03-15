Encoding.default_external = 'UTF-8'
STDOUT.sync = true;

begin
  filename = ARGV[0];

  regexp  = /(\s*\/\/\s*|\s*)?console\.(log|warn|error|assert)(?<paren>\((?:[^()]|\g<paren>)*\)[\s\;]?)/m
  replace = ''

  File.open(filename, "r") do |file|
    puts file.read.gsub(regexp, replace)
  end

rescue => ex
  print ex.class
  print ex.message
  print ex.backtrace
end
