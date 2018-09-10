default: push-watch

push-watch: commit-watch push

push:
	git push

commit-watch:
	git add watcher/data
	git commit -m 'Update watcher data'
