/* =========================
   DSA page logic + per-user Realtime DB sync
   Uses Realtime Database under: users/{uid}/dsacrate_completed_v2
   ========================= */

/* ========== CONFIG & CONTENT ========== */
const stepCounts = {
  step1:31, step2:7, step3:40, step4:32, step5:15, step6:31,
  step7:25, step8:18, step9:30, step10:12, step11:17, step12:16,
  step13:39, step14:16, step15:54, step16:56, step17:7, step18:9
};

const stepTitles = {
  step1:"Step 1: Learn the basics",
  step2:"Step 2: Learn Important Sorting Techniques",
  step3:"Step 3: Solve Problems on Arrays [Easy → Medium → Hard]",
  step4:"Step 4: Binary Search [1D, 2D Arrays, Search Space]",
  step5:"Step 5: Strings [Basic and Medium]",
  step6:"Step 6: Learn LinkedList [Single LL, Double LL, Medium, Hard Problems]",
  step7:"Step 7: Recursion [PatternWise]",
  step8:"Step 8: Bit Manipulation [Concepts & Problems]",
  step9:"Step 9: Stack and Queues [Learning, Pre-In-Post-fix, Monotonic Stack, Implementation]",
  step10:"Step 10: Sliding Window & Two Pointer Combined Problems",
  step11:"Step 11: Heaps [Learning, Medium, Hard Problems]",
  step12:"Step 12: Greedy Algorithms [Easy, Medium/Hard]",
  step13:"Step 13: Binary Trees [Traversals, Medium and Hard Problems]",
  step14:"Step 14: Binary Search Trees [Concept and Problems]",
  step15:"Step 15: Graphs [Concepts & Problems]",
  step16:"Step 16: Dynamic Programming [Patterns and Problems]",
  step17:"Step 17: Tries",
  step18:"Step 18: Strings (Advanced / Specialized)"
};

// COMPLETE DSA ROADMAP DATA FROM YOUR JSON
const lectureData = {
  step1: [
    {
      lectureTitle: "Lec 1: Things to Know in C++/Java/Python or any language",
      problems: [
        { title: "Problem 1 — User Input / Output", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Data Types", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — If Else statements", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Switch Statement", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — What are arrays, strings?", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — For loops", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — While loops", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Functions (Pass by Reference and Value)", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 9 — Time Complexity [Learn Basics, and then analyse in next Steps]", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 2: Build-up Logical Thinking",
      problems: [
        { title: "Problem 1 — Patterns", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 3: Learn STL/Java-Collections or similar thing in your language",
      problems: [
        { title: "Problem 1 — C++ STL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Java Collections", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 4: Know Basic Maths",
      problems: [
        { title: "Problem 1 — Count Digits", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Reverse a Number", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Check Palindrome", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — GCD Or HCF", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Armstrong Numbers", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Print all Divisors", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Check for Prime", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 5: Learn Basic Recursion",
      problems: [
        { title: "Problem 1 — Understand recursion by print something N times", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Print name N times using recursion", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Print 1 to N using recursion", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Print N to 1 using recursion", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Sum of first N numbers", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Factorial of N numbers", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Reverse an array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Check if a string is palindrome or not", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Fibonacci Number", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 6: Learn Basic Hashing",
      problems: [
        { title: "Problem 1 — Hashing Theory", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Counting frequencies of array elements", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Find the highest/lowest frequency element", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    }
  ],
  step2: [
    {
      lectureTitle: "Lec 1: Sorting-I",
      problems: [
        { title: "Problem 1 — Selection Sort", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Bubble Sort", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Insertion Sort", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 2: Sorting-II",
      problems: [
        { title: "Problem 1 — Merge Sort", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Recursive Bubble Sort", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Recursive Insertion Sort", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Quick Sort", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    }
  ],
  step3: [
    {
      lectureTitle: "Lec 1: Easy",
      problems: [
        { title: "Problem 1 — Largest Element in an Array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Second Largest Element in an Array without sorting", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Check if the array is sorted", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Remove duplicates from Sorted array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Left Rotate an array by one place", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Left rotate an array by D places", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Move Zeros to end", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Linear Search", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 9 — Find the Union", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Find missing number in an array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 11 — Maximum Consecutive Ones", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 12 — Find the number that appears once, and other numbers twice.", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 13 — Longest subarray with given sum K(positives)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 14 — Longest subarray with sum K (Positives + Negatives)", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Medium",
      problems: [
        { title: "Problem 1 — 2Sum Problem", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Sort an array of 0's 1's and 2's", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Majority Element (>n/2 times)", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Kadane's Algorithm, maximum subarray sum", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Print subarray with maximum subarray sum (extended version of above problem)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Stock Buy and Sell", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Rearrange the array in alternating positive and negative items", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Next Permutation", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Leaders in an Array problem", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 10 — Longest Consecutive Sequence in an Array", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Set Matrix Zeros", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 12 — Rotate Matrix by 90 degrees", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 13 — Print the matrix in spiral manner", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 14 — Count subarrays with given sum", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 3: Hard",
      problems: [
        { title: "Problem 1 — Pascal's Triangle", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Majority Element (n/3 times)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — 3-Sum Problem", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — 4-Sum Problem", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Largest Subarray with 0 Sum", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Count number of subarrays with given xor K", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Merge Overlapping Subintervals", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Merge two sorted arrays without extra space", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Find the repeating and missing number", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Count Inversions", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Reverse Pairs", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 12 — Maximum Product Subarray", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    }
  ],
  step4: [
    {
      lectureTitle: "Lec 1: BS on 1D Arrays",
      problems: [
        { title: "Problem 1 — Binary Search to find X in sorted array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Implement Lower Bound", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Implement Upper Bound", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Search Insert Position", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Floor/Ceil in Sorted Array", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Find the first or last occurrence of a given number in a sorted array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Count occurrences of a number in a sorted array with duplicates", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Search in Rotated Sorted Array I", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Search in Rotated Sorted Array II", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Find minimum in Rotated Sorted Array", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Find out how many times has an array been rotated", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 12 — Single element in a Sorted Array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 13 — Find peak element", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 2: BS on Answers",
      problems: [
        { title: "Problem 1 — Find square root of a number in log n", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Find the Nth root of a number using binary search", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Koko Eating Bananas", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Minimum days to make M bouquets", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Find the smallest Divisor", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Capacity to Ship Packages within D Days", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Kth Missing Positive Number", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Aggressive Cows", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 9 — Book Allocation Problem", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Split array - Largest Sum", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Painter's partition", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 12 — Minimize Max Distance to Gas Station", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 13 — Median of 2 sorted arrays", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 14 — Kth element of 2 sorted arrays", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: BS on 2D Arrays",
      problems: [
        { title: "Problem 1 — Find the row with maximum number of 1's", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Search in a 2 D matrix", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Search in a row and column wise sorted matrix", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Find Peak Element (2D Matrix)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Matrix Median", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step5: [
    {
      lectureTitle: "Lec 1: Basic and Easy String Problems",
      problems: [
        { title: "Problem 1 — Remove outermost Paranthesis", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Reverse words in a given string / Palindrome Check", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Largest odd number in a string", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Longest Common Prefix", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Isomorphic String", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — check whether one string is a rotation of another", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Check if two strings are anagram of each other", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Medium String Problems",
      problems: [
        { title: "Problem 1 — Sort Characters by frequency", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Maximum Nesting Depth of Paranthesis", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Roman Number to Integer and vice versa", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Implement Atoi", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Count Number of Substrings", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Longest Palindromic Substring[Do it without DP]", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Sum of Beauty of all substring", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Reverse Every Word in A String", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    }
  ],
  step6: [
    {
      lectureTitle: "Lec 1: Learn 1D LinkedList",
      problems: [
        { title: "Problem 1 — Introduction to LinkedList, learn about struct, and how is node represented", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Inserting a node in LinkedList", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Deleting a node in LinkedList", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Find the length of the linkedlist [learn traversal]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Search an element in the LL", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 2: Learn Doubly LinkedList",
      problems: [
        { title: "Problem 1 — Introduction to DLL, learn about struct, and how is node represented", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Insert a node in DLL", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Delete a node in DLL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Reverse a DLL", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: Medium Problems of LL",
      problems: [
        { title: "Problem 1 — Middle of a LinkedList [TortoiseHare Method]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Reverse a LinkedList [Iterative]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Reverse a LL [Recursive]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Detect a loop in LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Find the starting point in LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Length of Loop in LL", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Check if LL is palindrome or not", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Segrregate odd and even nodes in LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Remove Nth node from the back of the LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Delete the middle node of LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Sort LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 12 — Sort a LL of 0's 1's and 2's by changing links", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 13 — Find the intersection point of Y LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 14 — Add 1 to a number represented by LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 15 — Add 2 numbers in LL", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 4: Medium Problems of DLL",
      problems: [
        { title: "Problem 1 — Delete all occurrences of a key in DLL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Find pairs with given sum in DLL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Remove duplicates from sorted DLL", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 5: Hard Problems of LL",
      problems: [
        { title: "Problem 1 — Reverse LL in group of given size K", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Rotate a LL", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Flattening of LL", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Clone a Linked List with random and next pointer", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step7: [
    {
      lectureTitle: "Lec 1: Get a Strong Hold",
      problems: [
        { title: "Problem 1 — Recursive Implementation of atoi()", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Pow(x, n)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Count Good numbers", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Sort a stack using recursion", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Reverse a stack using recursion", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 2: Subsequences Pattern",
      problems: [
        { title: "Problem 1 — Generate all binary strings", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Generate Paranthesis", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Print all subsequences/Power Set", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Learn All Patterns of Subsequences (Theory)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Count all subsequences with sum K", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Check if there exists a subsequence with sum K", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Combination Sum", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Combination Sum-II", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Subset Sum-I", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Subset Sum-II", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Combination Sum - III", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 12 — Letter Combinations of a Phone number", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: Trying out all Combos / Hard",
      problems: [
        { title: "Problem 1 — Palindrome Partitioning", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Word Search", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — N Queen", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Rat in a Maze", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Word Break", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — M Coloring Problem", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Sudoko Solver", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 8 — Expression Add Operators", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step8: [
    {
      lectureTitle: "Lec 1: Learn Bit Manipulation",
      problems: [
        { title: "Problem 1 — Introduction to Bit Manipulation [Theory]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Check if the i-th bit is set or not", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Check if a number is odd or not", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Check if a number is power of 2 or not", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Count the number of set bits", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Set/Unset the rightmost unset bit", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Swap two numbers", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Divide two integers without using multiplication, division and mod operator", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Interview Problems",
      problems: [
        { title: "Problem 1 — Count number of bits to be flipped to convert A to B", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Find the number that appears odd number of times", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Power Set", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Find xor of numbers from L to R", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Find the two numbers appearing odd number of times", solve: "#", resource: "#", difficulty: "Easy" }
      ]
    },
    {
      lectureTitle: "Lec 3: Advanced Maths",
      problems: [
        { title: "Problem 1 — Print Prime Factors of a Number", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — All Divisors of a Number", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Sieve of Eratosthenes", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Find Prime Factorisation of a Number using Sieve", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Power(n, x)", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    }
  ],
  step9: [
    {
      lectureTitle: "Lec 1: Learning",
      problems: [
        { title: "Problem 1 — Implement Stack using Arrays", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Implement Queue using Arrays", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Implement Stack using Queue", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Implement Queue using Stack", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Implement stack using Linkedlist", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Implement queue using Linkedlist", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Check for balanced paranthesis", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Implement Min Stack", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Prefix, Infix, PostFix Conversion Problems",
      problems: [
        { title: "Problem 1 — Infix to Postfix Conversion using Stack", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Prefix to Infix Conversion", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Prefix to Postfix Conversion", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Postfix to Prefix Conversion", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Postfix to Infix", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Convert Infix To Prefix Notation", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: Monotonic Stack/Queue Problems [VVV. Imp]",
      problems: [
        { title: "Problem 1 — Next Greater Element", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Next Greater Element 2", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Next Smaller Element", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Number of NGEs to the right", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Trapping Rainwater", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Sum of subarray minimum", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Asteroid Collision", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Sum of subarray ranges", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Remove k Digits", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Largest rectangle in a histogram", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Maximal Rectangles", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 4: Implementation Problems",
      problems: [
        { title: "Problem 1 — Sliding Window maximum", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Stock span problem", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — The Celebrity Problem", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — LRU cache (IMPORTANT)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — LFU cache", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step10: [
    {
      lectureTitle: "Lec 1: Medium Problems",
      problems: [
        { title: "Problem 1 — Longest Substring Without Repeating Characters", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Max Consecutive Ones III", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Fruit Into Baskets", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — longest repeating character replacement", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Binary subarray with sum", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Count number of nice subarrays", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Number of substring containing all three characters", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Maximum point you can obtain from cards", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Hard Problems",
      problems: [
        { title: "Problem 1 — Longest Substring with At Most K Distinct Characters", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Subarray with k different integers", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Minimum Window Substring", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Minimum Window Subsequence", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step11: [
    {
      lectureTitle: "Lec 1: Learning",
      problems: [
        { title: "Problem 1 — Introduction to Priority Queues using Binary Heaps", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Min Heap and Max Heap Implementation", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Check if an array represents a min-heap or not", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Convert min Heap to max Heap", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Medium Problems",
      problems: [
        { title: "Problem 1 — Kth largest element in an array [use priority queue]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Kth smallest element in an array [use priority queue]", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Sort K sorted array", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Merge M sorted Lists", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Replace each array element by its corresponding rank", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Task Scheduler", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Hands of Straights", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: Hard Problems",
      problems: [
        { title: "Problem 1 — Design twitter", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Connect `n` ropes with minimal cost", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Kth largest element in a stream of running integers", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Maximum Sum Combination", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Find Median from Data Stream", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — K most frequent elements", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    }
  ],
  step12: [
    {
      lectureTitle: "Lec 1: Easy Problems",
      problems: [
        { title: "Problem 1 — Assign Cookies", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Fractional Knapsack Problem", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Greedy algorithm to find minimum number of coins", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Lemonade Change", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Valid Paranthesis Checker", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Medium/Hard",
      problems: [
        { title: "Problem 1 — N meetings in one room", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Jump Game", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Jump Game 2", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Minimum number of platforms required for a railway", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Job sequencing Problem", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Candy", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Program for Shortest Job First (or SJF) CPU Scheduling", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Program for Least Recently Used (LRU) Page Replacement Algorithm", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Insert Interval", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Merge Intervals", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Non-overlapping Intervals", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    }
  ],
  step13: [
    {
      lectureTitle: "Lec 1: Traversals",
      problems: [
        { title: "Problem 1 — Introduction to Trees", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Binary Tree Representation in C++", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Binary Tree Representation in Java", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Binary Tree Traversals in Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 5 — Preorder Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — Inorder Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Post-order Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 8 — Level order Traversal / Level order traversal in spiral form", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 9 — Iterative Preorder Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 10 — Iterative Inorder Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 11 — Post-order Traversal of Binary Tree using 2 stack", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 12 — Post-order Traversal of Binary Tree using 1 stack", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 13 — Preorder, Inorder, and Postorder Traversal in one Traversal", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Medium Problems",
      problems: [
        { title: "Problem 1 — Height of a Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Check if the Binary tree is height-balanced or not", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Diameter of Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Maximum path sum", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Check if two trees are identical or not", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Zig Zag Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 7 — Boundary Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Vertical Order Traversal of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 9 — Top View of Binary Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 10 — Bottom View of Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 11 — Right/Left View of Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 12 — Symmetric Binary Tree", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: Hard Problems",
      problems: [
        { title: "Problem 1 — Root to Node Path in Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — LCA in Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Maximum width of a Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Check for Children Sum Property", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Print all the Nodes at a distance of K in a Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Minimum time taken to BURN the Binary Tree from a Node", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Count total Nodes in a COMPLETE Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Requirements needed to construct a Unique Binary Tree | Theory", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Construct Binary Tree from inorder and preorder", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Construct the Binary Tree from Postorder and Inorder Traversal", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Serialize and deserialize Binary Tree", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 12 — Morris Preorder Traversal of a Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 13 — Morris Inorder Traversal of a Binary Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 14 — Flatten Binary Tree to LinkedList", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step14: [
    {
      lectureTitle: "Lec 1: Concepts",
      problems: [
        { title: "Problem 1 — Introduction to Binary Search Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Search in a Binary Search Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Find Min/Max in BST", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: Practice Problems",
      problems: [
        { title: "Problem 1 — Ceil in a Binary Search Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Floor in a Binary Search Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Insert a given Node in Binary Search Tree", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Delete a Node in Binary Search Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Find K-th smallest/largest element in BST", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Check if a tree is a BST or BT", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — LCA in Binary Search Tree", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Construct a BST from a preorder traversal", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Inorder Successor/Predecessor in BST", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Merge 2 BST's", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Two Sum In BST | Check if there exists a pair with Sum K", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 12 — Recover BST | Correct BST with two nodes swapped", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 13 — Largest BST in Binary Tree", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step15: [
    {
      lectureTitle: "Lec 1: Learning",
      problems: [
        { title: "Problem 1 — Graph and Types", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 2 — Graph Representation | C++", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 3 — Graph Representation | Java", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 4 — Connected Components | Logic Explanation", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — BFS", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — DFS", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 2: Problems on BFS/DFS",
      problems: [
        { title: "Problem 1 — Number of provinces (leetcode)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Connected Components Problem in Matrix", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Rotten Oranges", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Flood fill", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Cycle Detection in unirected Graph (bfs)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Cycle Detection in undirected Graph (dfs)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — 0/1 Matrix (Bfs Problem)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Surrounded Regions (dfs)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 9 — Number of Enclaves [flood fill implementation - multisource]", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Word ladder - 1", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Word ladder - 2", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 12 — Number of Distinct Islands [dfs multisource]", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 13 — Bipartite Graph (DFS)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 14 — Cycle Detection in Directed Graph (DFS)", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 3: Topo Sort and Problems",
      problems: [
        { title: "Problem 1 — Topo Sort", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Kahn's Algorithm", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Cycle Detection in Directed Graph (BFS)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Course Schedule - I", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Course Schedule - II", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Find eventual safe states", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Alien dictionary", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 4: Shortest Path Algorithms and Problems",
      problems: [
        { title: "Problem 1 — Shortest Path in UG with unit weights", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Shortest Path in DAG", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Djisktra's Algorithm", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Why priority Queue is used in Djisktra's Algorithm", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Shortest path in a binary maze", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Path with minimum effort", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Cheapest flights within k stops", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 8 — Network Delay time", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Number of ways to arrive at destination", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 10 — Minimum steps to reach end from start by performing multiplication and mod operations with array elements", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Bellman Ford Algorithm", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 12 — Floyd Warshal Algorithm", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 13 — Find the city with the smallest number of neighbors in a threshold distance", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 5: MinimumSpanningTree/Disjoint Set and Problems",
      problems: [
        { title: "Problem 1 — Minimum Spanning Tree", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Prim's Algorithm", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Disjoint Set [Union by Rank]", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Disjoint Set [Union by Size]", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Kruskal's Algorithm", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Number of operations to make network connected", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — Most stones removed with same rows or columns", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 8 — Accounts merge", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 9 — Number of island II", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Making a Large Island", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Swim in rising water", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 6: Other Algorithms",
      problems: [
        { title: "Problem 1 — Bridges in Graph", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Articulation Point", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Kosaraju's Algorithm", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step16: [
    {
      lectureTitle: "Lec 1: Introduction to DP",
      problems: [
        { title: "Problem 1 — Dynamic Programming Introduction", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 2: 1D DP",
      problems: [
        { title: "Problem 1 — Climbing Stars", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Frog Jump(DP-3)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Frog Jump with k distances(DP-4)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Maximum sum of non-adjacent elements (DP 5)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — House Robber (DP 6)", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 3: 2D/3D DP and DP on Grids",
      problems: [
        { title: "Problem 1 — Ninja's Training (DP 7)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Grid Unique Paths : DP on Grids (DP8)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Grid Unique Paths 2 (DP 9)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Minimum path sum in Grid (DP 10)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Minimum path sum in Triangular Grid (DP 11)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Minimum/Maximum Falling Path Sum (DP-12)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 7 — 3-d DP : Ninja and his friends (DP-13)", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 4: DP on Subsequences",
      problems: [
        { title: "Problem 1 — Subset sum equal to target (DP- 14)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Partition Equal Subset Sum (DP- 15)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Partition Set Into 2 Subsets With Min Absolute Sum Diff (DP- 16)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Count Subsets with Sum K (DP - 17)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 5 — Count Partitions with Given Difference (DP - 18)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Assign Cookies", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Minimum Coins (DP - 20)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 8 — Target Sum (DP - 21)", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 9 — Coin Change 2 (DP - 22)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Unbounded Knapsack (DP - 23)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 11 — Rod Cutting Problem | (DP - 24)", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 5: DP on Strings",
      problems: [
        { title: "Problem 1 — Longest Common Subsequence | (DP - 25)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Print Longest Common Subsequence | (DP - 26)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Longest Common Substring | (DP - 27)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Longest Palindromic Subsequence | (DP-28)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Minimum insertions to make string palindrome | DP-29", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Minimum Insertions/Deletions to Convert String | (DP- 30)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Shortest Common Supersequence | (DP - 31)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 8 — Distinct Subsequences| (DP-32)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 9 — Edit Distance | (DP-33)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 10 — Wildcard Matching | (DP-34)", solve: "#", resource: "#", difficulty: "Medium" }
      ]
    },
    {
      lectureTitle: "Lec 6: DP on Stocks",
      problems: [
        { title: "Problem 1 — Best Time to Buy and Sell Stock |(DP-35)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Buy and Sell Stock - II|(DP-36)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Buy and Sell Stocks III|(DP-37)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Buy and Stock Sell IV |(DP-38)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Buy and Sell Stocks With Cooldown|(DP-39)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Buy and Sell Stocks With Transaction Fee|(DP-40)", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 7: DP on LIS",
      problems: [
        { title: "Problem 1 — Longest Increasing Subsequence |(DP-41)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Printing Longest Increasing Subsequence|(DP-42)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Longest Increasing Subsequence |(DP-43)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Largest Divisible Subset|(DP-44)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Longest String Chain|(DP-45)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Longest Bitonic Subsequence |(DP-46)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Number of Longest Increasing Subsequences|(DP-47)", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 8: MCM DP | Partition DP",
      problems: [
        { title: "Problem 1 — Matrix Chain Multiplication|(DP-48)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Matrix Chain Multiplication | Bottom-Up|(DP-49)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 3 — Minimum Cost to Cut the Stick|(DP-50)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Burst Balloons|(DP-51)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Evaluate Boolean Expression to True|(DP-52)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 6 — Palindrome Partitioning - II|(DP-53)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Partition Array for Maximum Sum|(DP-54)", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 9: DP on Squares",
      problems: [
        { title: "Problem 1 — Maximum Rectangle Area with all 1's|(DP-55)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Count Square Submatrices with All Ones|(DP-56)", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step17: [
    {
      lectureTitle: "Lec 1: Theory",
      problems: [
        { title: "Problem 1 — Implement TRIE | INSERT | SEARCH | STARTSWITH", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    },
    {
      lectureTitle: "Lec 2: Problems",
      problems: [
        { title: "Problem 1 — Implement Trie - 2 (Prefix Tree)", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 2 — Longest String with All Prefixes", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Number of Distinct Substrings in a String", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 4 — Bit PreRequisites for TRIE Problems", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Maximum XOR of two numbers in an array", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 6 — Maximum XOR With an Element From Array", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ],
  step18: [
    {
      lectureTitle: "Lec 1: Hard Problems",
      problems: [
        { title: "Problem 1 — Minimum number of bracket reversals needed to make an expression balanced", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 2 — Count and say", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 3 — Hashing In Strings | Theory", solve: "#", resource: "#", difficulty: "Medium" },
        { title: "Problem 4 — Rabin Karp", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 5 — Z-Function", solve: "#", resource: "#", difficulty: "Easy" },
        { title: "Problem 6 — KMP algo / LPS(pi) array", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 7 — Shortest Palindrome", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 8 — Longest happy prefix", solve: "#", resource: "#", difficulty: "Hard" },
        { title: "Problem 9 — Count palindromic subsequence in given string", solve: "#", resource: "#", difficulty: "Hard" }
      ]
    }
  ]
};

/* ========== Realtime DB + state ========== */
const rdb = firebase.database();
let currentUserUid = null;
// in-memory set of completed problem IDs (like "step1-1-3")
let completedSet = new Set();

function localKeyForUid(uid) {
  return uid ? `dsacrate_completed_${uid}_v2` : 'dsacrate_completed_shared_v2';
}
function saveCompletedLocalSet(set) {
  try {
    const arr = Array.from(set);
    localStorage.setItem(localKeyForUid(currentUserUid), JSON.stringify(arr));
  } catch(e){ console.warn('local save failed', e); }
}
function loadCompletedLocalSet(uid) {
  try {
    const raw = localStorage.getItem(localKeyForUid(uid));
    if (!raw) return new Set();
    return new Set(JSON.parse(raw));
  } catch(e){
    return new Set();
  }
}
async function loadCompletedRemote(uid) {
  if (!uid) return new Set();
  try {
    const snap = await rdb.ref(`users/${uid}/dsacrate_completed_v2`).once('value');
    const val = snap.val() || {};
    // val is expected to be an object { pid1: true, pid2: true, ... }
    return new Set(Object.keys(val));
  } catch(e) {
    console.error('remote load error', e);
    return new Set();
  }
}
async function saveCompletedRemote(set) {
  if (!currentUserUid) return;
  const obj = {};
  set.forEach(pid => obj[pid] = true);
  try {
    await rdb.ref(`users/${currentUserUid}/dsacrate_completed_v2`).set(obj);
  } catch(e){
    console.error('remote save error', e);
  }
}

/* ========== BUILD UI ========== */
function buildSteps(){
  const container = document.getElementById('stepsContainer');
  container.innerHTML = '';
  Object.keys(stepCounts).forEach((stepId, sIdx) => {
    const stepSection = document.createElement('div');
    stepSection.className='step-section';
    stepSection.id=`${stepId}-section`;

    const header = document.createElement('div');
    header.className='step-header';
    const toggle = document.createElement('button');
    toggle.className='toggle-btn';
    toggle.innerText='▶';
    const title = document.createElement('div');
    title.className='step-title';
    title.innerText = stepTitles[stepId] || `Step ${sIdx+1}`;
    const progressWrap = document.createElement('div');
    progressWrap.className='step-progress';
    const progressBar = document.createElement('div');
    progressBar.className='progress-bar';
    const progressFill = document.createElement('div');
    progressFill.className='progress-fill';
    progressFill.id = `stepbar-${stepId}`;
    progressBar.appendChild(progressFill);
    const countSpan = document.createElement('span');
    countSpan.id=`stepcount-${stepId}`;
    countSpan.innerText = `0 / ${stepCounts[stepId]}`;

    progressWrap.appendChild(progressBar);
    progressWrap.appendChild(countSpan);

    header.appendChild(toggle);
    header.appendChild(title);
    header.appendChild(progressWrap);

    const content = document.createElement('div');
    content.className='step-content';
    content.id = `${stepId}-content`;

    header.addEventListener('click', () => {
      const opened = content.classList.toggle('active');
      toggle.classList.toggle('rot', opened);
    });

    stepSection.appendChild(header);
    stepSection.appendChild(content);
    container.appendChild(stepSection);

    const lectures = lectureData[stepId] || [];
    lectures.forEach((lec, li) => {
      const lecWrap = document.createElement('div');
      lecWrap.className='lecture';

      const lecHeader = document.createElement('div');
      lecHeader.className='lecture-header';
      const lecToggle = document.createElement('button');
      lecToggle.className='toggle-btn';
      lecToggle.innerText='▶';
      const lecTitle = document.createElement('div');
      lecTitle.className='lecture-title';
      lecTitle.innerText = lec.lectureTitle || `Lecture ${li+1}`;
      const lecSub = document.createElement('div');
      lecSub.className='lecture-subinfo';
      lecSub.id = `${stepId}-lec-${li+1}-sub`;
      lecSub.innerText = `0 / ${lec.problems.length}`;

      lecHeader.appendChild(lecToggle);
      lecHeader.appendChild(lecTitle);
      lecHeader.appendChild(lecSub);

      const lecContent = document.createElement('div');
      lecContent.className='lecture-content';
      lecContent.id = `${stepId}-lec-${li+1}-content`;

      lecHeader.addEventListener('click', () => {
        const on = lecContent.classList.toggle('active');
        lecToggle.classList.toggle('rot', on);
      });

      lec.problems.forEach((prob, pi) => {
        const pid = `${stepId}-${li+1}-${pi+1}`; // unique id
        const probWrap = document.createElement('div');
        probWrap.className='problem-item';
        probWrap.id = `prob-${pid}`;

        const status = document.createElement('div');
        status.className='problem-status';
        status.dataset.pid = pid;

        // if already in completedSet (may be empty now — will be updated after remote load)
        if (completedSet.has(pid)) status.classList.add('completed');

        const titleEl = document.createElement('div');
        titleEl.className='problem-title';
        titleEl.innerText = prob.title || `Problem ${pi+1}`;

        const probInfo = document.createElement('div');
        probInfo.className='problem-info';

        // Add difficulty badge
        const difficultyBadge = document.createElement('div');
        difficultyBadge.className = `difficulty-badge difficulty-${prob.difficulty.toLowerCase()}`;
        difficultyBadge.innerText = prob.difficulty;

        const links = document.createElement('div');
        links.className='resource-links';
        
        // FIND THIS SECTION in your dsa.js file and REPLACE it:

// OLD CODE (lines around 950-960):
/*
// VIEW button (changed from Solve)
if (prob.solve){
  const a = document.createElement('a'); 
  a.href = prob.solve; 
  a.className = 'btn view'; 
  a.target = '_blank'; 
  a.innerText = 'VIEW'; 
  links.appendChild(a);
}
*/

// NEW CODE - Replace with this:
// VIEW button - opens in code editor
const viewBtn = document.createElement('a'); 
viewBtn.className = 'btn view'; 
viewBtn.innerText = 'VIEW'; 
viewBtn.href = `editor.html?step=${stepId}&lecture=${li}&problem=${pi}`;
viewBtn.target = '_blank';
links.appendChild(viewBtn);

// Keep the RESOURCE icon part unchanged:
// RESOURCE icon
// if (prob.resource){
//   const a = document.createElement('a'); 
//   a.href = prob.resource; 
//   a.className = 'resource-icon'; 
//   a.target = '_blank'; 
//   a.innerText = '📄'; 
//   a.title = 'Resources';
//   links.appendChild(a);
// }
        
//         // RESOURCE icon
//         if (prob.resource){
//           const a = document.createElement('a'); 
//           a.href = prob.resource; 
//           a.className = 'resource-icon'; 
//           a.target = '_blank'; 
//           a.innerText = '📄'; 
//           a.title = 'Resources';
//           links.appendChild(a);
//         }

        probInfo.appendChild(difficultyBadge);
        probInfo.appendChild(links);

        // Toggle completion — updates in-memory set, localStorage and remote DB
        status.addEventListener('click', async (ev) => {
          ev.stopPropagation();
          if (completedSet.has(pid)) {
            completedSet.delete(pid);
            status.classList.remove('completed');
          } else {
            completedSet.add(pid);
            status.classList.add('completed');
          }

          // persist locally and remotely
          saveCompletedLocalSet(completedSet);
          if (currentUserUid) {
            // don't await UI update — but do log errors if any
            saveCompletedRemote(completedSet).catch(err => console.error('save remote error', err));
          }
          updateProgressUI();
        });

        probWrap.appendChild(status);
        probWrap.appendChild(titleEl);
        probWrap.appendChild(probInfo);
        lecContent.appendChild(probWrap);
      });

      lecWrap.appendChild(lecHeader);
      lecWrap.appendChild(lecContent);
      content.appendChild(lecWrap);
    });
  });
}

/* ========== Update progress UI ========== */
function updateProgressUI(){
  // uses completedSet
  let totalCompleted = 0;
  let overallTotal = 0;
  Object.keys(stepCounts).forEach(stepId=>{
    const lectures = lectureData[stepId] || [];
    let stepTotal = 0, stepComp = 0;
    lectures.forEach((lec, li)=>{
      const n = lec.problems.length;
      stepTotal += n;
      for(let i=0;i<n;i++){
        overallTotal++;
        const pid = `${stepId}-${li+1}-${i+1}`;
        if (completedSet.has(pid)) { stepComp++; totalCompleted++; }
      }
      const lecSub = document.getElementById(`${stepId}-lec-${li+1}-sub`);
      if (lecSub){
        let lecComp = 0;
        for(let i=0;i<lec.problems.length;i++){
          if (completedSet.has(`${stepId}-${li+1}-${i+1}`)) lecComp++;
        }
        lecSub.innerText = `${lecComp} / ${lec.problems.length}`;
      }
    });
    const stepBar = document.getElementById(`stepbar-${stepId}`);
    const stepCountEl = document.getElementById(`stepcount-${stepId}`);
    if (stepBar) {
      const pct = Math.round((stepComp / Math.max(1, stepTotal)) * 100);
      stepBar.style.width = pct + '%';
    }
    if (stepCountEl) stepCountEl.innerText = `${stepComp} / ${stepTotal}`;
  });

  const overallTotalCount = Object.values(lectureData).reduce((sum, arr) => sum + arr.reduce((s,lec)=>s+lec.problems.length,0), 0);
  const pctOverall = Math.round((totalCompleted / Math.max(1, overallTotalCount)) * 100);
  document.getElementById('overallPercent').innerText = pctOverall + '%';
  document.getElementById('overallCount').innerText = `${totalCompleted} / ${overallTotalCount} completed`;

  const circ = document.querySelector('.circ-fill');
  if (circ){
    const circumference = 2 * Math.PI * 39;
    circ.style.strokeDasharray = circumference;
    const offset = circumference * (1 - pctOverall / 100);
    circ.style.strokeDashoffset = offset;
  }

  const EASY_TOTAL = 131;
  const MEDIUM_TOTAL = 187;
  const HARD_TOTAL = 136;

  let easyC=0, medC=0, hardC=0;
  Object.keys(lectureData).forEach(stepId=>{
    lectureData[stepId].forEach((lec, li)=>{
      lec.problems.forEach((p,pi)=>{
        const d = (p.difficulty || 'Medium').toLowerCase();
        const pid = `${stepId}-${li+1}-${pi+1}`;
        if (completedSet.has(pid)) {
          if (d.startsWith('e')){ easyC++; }
          else if (d.startsWith('h')){ hardC++; }
          else { medC++; }
        }
      })
    })
  });

  const easyPct = Math.round((easyC / EASY_TOTAL)*100);
  const medPct = Math.round((medC / MEDIUM_TOTAL)*100);
  const hardPct = Math.round((hardC / HARD_TOTAL)*100);

  document.getElementById('easyCount').innerText = `${easyC} / ${EASY_TOTAL}`;
  document.getElementById('mediumCount').innerText = `${medC} / ${MEDIUM_TOTAL}`;
  document.getElementById('hardCount').innerText = `${hardC} / ${HARD_TOTAL}`;
  document.getElementById('easyBar').style.width = easyPct + '%';
  document.getElementById('mediumBar').style.width = medPct + '%';
  document.getElementById('hardBar').style.width = hardPct + '%';
}

/* ========== INIT & AUTH SYNC ========== */
document.addEventListener('DOMContentLoaded', () => {
  buildSteps();

  // Listen for auth. When a user is active, load their remote progress
  firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      // not logged in → redirect
      window.location.href = "index.html";
      return;
    }

    currentUserUid = user.uid;
    const nameElement = document.getElementById("userName");
    if (nameElement) {
      nameElement.textContent = user.displayName || user.email;
    }

    // Try load remote progress
    const remote = await loadCompletedRemote(currentUserUid);

    if (remote.size === 0) {
      // no remote data: try local fallback and push to remote if local exists
      const local = loadCompletedLocalSet(currentUserUid);
      if (local.size > 0) {
        completedSet = local;
        await saveCompletedRemote(completedSet).catch(e => console.error(e));
      } else {
        completedSet = new Set();
      }
    } else {
      // remote exists -> use it and also overwrite local cache
      completedSet = remote;
      saveCompletedLocalSet(completedSet);
    }

    // mark DOM nodes with completed status
    completedSet.forEach(pid=>{
      const node = document.querySelector(`[data-pid="${pid}"]`);
      if (node) node.classList.add('completed');
    });

    updateProgressUI();

    // Expand first step + lecture for convenience (existing UX)
    const s1content = document.getElementById('step1-content');
    if (s1content) {
      s1content.classList.add('active');
      const btn = document.querySelector('#step1-section .toggle-btn');
      if (btn) btn.classList.add('rot');
    }
    const firstLectureContent = document.getElementById('step1-lec-1-content');
    const firstLectureToggle = document.querySelector('#step1-section .lecture .toggle-btn');
    if (firstLectureContent) {
      firstLectureContent.classList.add('active');
      if (firstLectureToggle) firstLectureToggle.classList.add('rot');
    }
  });
});