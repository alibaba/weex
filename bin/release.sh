# Export bugfix log
git log --pretty=format:"%s %h" --no-merges  --since="2016-05-17" | grep -E "^[\\*]\s*\[(jsfm|html5|android|ios)\].*(fix|bug|close)" > commit-history.log

# git log --pretty=format:"%s %h" --no-merges  --since="2016-05-17" | grep -E "^[\\*]\s*\[(jsfm|html5|android|ios)\]" > commit-history.log
