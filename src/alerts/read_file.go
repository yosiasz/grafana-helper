package main

import (
	"fmt"
	"io/ioutil"
	"os"

	"pkg.go.dev/golang.org/x/text/encoding/ianaindex"
)

func main() {
	// Provide the file path as a command-line argument
	if len(os.Args) < 2 {
		fmt.Println("Please provide a file path")
		return
	}

	filePath := os.Args[1]

	// Read the file contents
	content, err := ioutil.ReadFile(filePath)
	if err != nil {
		fmt.Printf("Failed to read file: %v\n", err)
		return
	}

	// Detect the encoding of the file
	encodings, err := ianaindex.All.ByName("utf-8")
	if err != nil {
		fmt.Printf("Failed to retrieve encoding: %v\n", err)
		return
	}

	encodingName, _, _ := encodings.Encoding(content)

	fmt.Printf("File encoding: %s\n", encodingName)
}
