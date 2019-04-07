package main

import (
	"io/ioutil"
	"os"
	"testing"
)

var path = "./test.html"
var startContent = `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <title>Docker - Angular Runtime Variables Demo</title>
  <base href="/" />

  <!--CONFIG-->

  <link href="https://fonts.googleapis.com/css?family=Major+Mono+Display" rel="stylesheet" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/x-icon" href="favicon.ico" />
</head>

<body>
  <app-root></app-root>
</body>

</html>
`

func TestMain(m *testing.M) {
	setup()
	retCode := m.Run()
	teardown()
	os.Exit(retCode)
}

func setup() {
}

func teardown() {
	var err = os.Remove(path)
	if err != nil {
		return
	}
}

func prepareTestFile() {
	// Generate Test File
	WriteFile(path, startContent)
}

func WriteFile(path string, content string) {
	err := ioutil.WriteFile(path, []byte(content), 0644)
	if err != nil {
		panic(err)
	}
}
