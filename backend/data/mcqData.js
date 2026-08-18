const mcqData = [
  // Arrays - 5 questions
  {
    questionId: 1,
    category: 'Arrays',
    topic: 'Arrays Basics',
    question: 'What is the time complexity of accessing an element by index in an array?',
    options: [
      { text: 'O(n)', isCorrect: false },
      { text: 'O(1)', isCorrect: true },
      { text: 'O(log n)', isCorrect: false },
      { text: 'O(n log n)', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Arrays provide direct memory access. Using an index to access an element takes constant time O(1).'
  },
  {
    questionId: 2,
    category: 'Arrays',
    topic: 'Two Pointers',
    question: 'Which approach is best for finding two numbers that add up to a target in a sorted array?',
    options: [
      { text: 'Nested loops', isCorrect: false },
      { text: 'Two pointers', isCorrect: true },
      { text: 'Binary search', isCorrect: false },
      { text: 'Hash map', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Two pointers technique is optimal for sorted arrays - one at start, one at end. Move based on sum comparison. Time: O(n), Space: O(1).'
  },
  {
    questionId: 3,
    category: 'Arrays',
    topic: 'Rotation',
    question: 'What is the time complexity of rotating an array by k positions using the reversal method?',
    options: [
      { text: 'O(n^2)', isCorrect: false },
      { text: 'O(n)', isCorrect: true },
      { text: 'O(k)', isCorrect: false },
      { text: 'O(log n)', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Reversal method: reverse first k elements, then remaining, then whole array. Each reversal is O(n). Total: O(n).'
  },
  {
    questionId: 4,
    category: 'Arrays',
    topic: 'Subarray',
    question: 'What is Kadane\'s algorithm used for?',
    options: [
      { text: 'Finding longest increasing subsequence', isCorrect: false },
      { text: 'Finding maximum sum subarray', isCorrect: true },
      { text: 'Sorting array', isCorrect: false },
      { text: 'Finding kth largest element', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Kadane\'s algorithm finds the contiguous subarray with the largest sum. Time: O(n), Space: O(1).'
  },
  {
    questionId: 5,
    category: 'Arrays',
    topic: 'Searching',
    question: 'In a rotated sorted array, what is the best approach to search for an element?',
    options: [
      { text: 'Linear search', isCorrect: false },
      { text: 'Modified binary search', isCorrect: true },
      { text: 'Hash map', isCorrect: false },
      { text: 'Two pointers', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: 'Use modified binary search to identify which half is sorted, then check if target lies in that half. Time: O(log n).'
  },

  // Strings - 5 questions
  {
    questionId: 6,
    category: 'Strings',
    topic: 'Palindrome',
    question: 'What is the optimal way to check if a string is a palindrome?',
    options: [
      { text: 'Convert to array and compare', isCorrect: false },
      { text: 'Use two pointers from start and end', isCorrect: true },
      { text: 'Use regex', isCorrect: false },
      { text: 'Create reversed string and compare', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Two-pointer approach checks characters from both ends moving inward. Time: O(n), Space: O(1).'
  },
  {
    questionId: 7,
    category: 'Strings',
    topic: 'Pattern Matching',
    question: 'What is the time complexity of KMP (Knuth-Morris-Pratt) algorithm for pattern matching?',
    options: [
      { text: 'O((n+m)^2)', isCorrect: false },
      { text: 'O(n*m)', isCorrect: false },
      { text: 'O(n+m)', isCorrect: true },
      { text: 'O(log(n+m))', isCorrect: false }
    ],
    correctAnswerIndex: 2,
    difficulty: 'Hard',
    explanation: 'KMP uses a failure function to avoid redundant comparisons. Time: O(n+m) where n is text length, m is pattern length.'
  },
  {
    questionId: 8,
    category: 'Strings',
    topic: 'Anagram',
    question: 'How can you efficiently check if two strings are anagrams?',
    options: [
      { text: 'Compare sorted strings', isCorrect: true },
      { text: 'Character by character comparison', isCorrect: false },
      { text: 'Using regex', isCorrect: false },
      { text: 'Length comparison only', isCorrect: false }
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: 'Sort both strings and compare. Time: O(n log n). Alternatively, use character count map for O(n) time.'
  },
  {
    questionId: 9,
    category: 'Strings',
    topic: 'Subsequence',
    question: 'What is the difference between substring and subsequence?',
    options: [
      { text: 'No difference', isCorrect: false },
      { text: 'Substring is contiguous, subsequence is not', isCorrect: true },
      { text: 'Subsequence is contiguous, substring is not', isCorrect: false },
      { text: 'They are different terms for same thing', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Substring must be contiguous (e.g., "abc" in "abcd"). Subsequence maintains order but not contiguity (e.g., "ac" from "abc").'
  },
  {
    questionId: 10,
    category: 'Strings',
    topic: 'Compression',
    question: 'In string compression, what should be the output for "aaabbbcccc"?',
    options: [
      { text: '"a3b3c4"', isCorrect: true },
      { text: '"3a3b4c"', isCorrect: false },
      { text: '"aaa3bbb3cccc4"', isCorrect: false },
      { text: '"abcabc"', isCorrect: false }
    ],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: 'String compression replaces consecutive characters with the character followed by count. "aaabbbcccc" becomes "a3b3c4".'
  },

  // Trees - 5 questions
  {
    questionId: 11,
    category: 'Trees',
    topic: 'Traversal',
    question: 'Which tree traversal visits nodes in the order: Root, Left, Right?',
    options: [
      { text: 'Inorder', isCorrect: false },
      { text: 'Preorder', isCorrect: true },
      { text: 'Postorder', isCorrect: false },
      { text: 'Level order', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Preorder: Root → Left → Right. Used for creating copy of tree or getting prefix expression.'
  },
  {
    questionId: 12,
    category: 'Trees',
    topic: 'Binary Search Tree',
    question: 'What property must a Binary Search Tree maintain?',
    options: [
      { text: 'Left child > Parent > Right child', isCorrect: false },
      { text: 'Parent > Left child and Parent > Right child', isCorrect: false },
      { text: 'Left child < Parent < Right child', isCorrect: true },
      { text: 'All nodes are equal', isCorrect: false }
    ],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: 'In BST, all values in left subtree are less than parent, all values in right subtree are greater than parent.'
  },
  {
    questionId: 13,
    category: 'Trees',
    topic: 'Balanced Tree',
    question: 'What is the height of a balanced binary tree with n nodes?',
    options: [
      { text: 'O(n)', isCorrect: false },
      { text: 'O(log n)', isCorrect: true },
      { text: 'O(n^2)', isCorrect: false },
      { text: 'O(sqrt(n))', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'A balanced tree maintains height difference ≤ 1 between left and right subtrees, resulting in O(log n) height.'
  },
  {
    questionId: 14,
    category: 'Trees',
    topic: 'Path Sum',
    question: 'In a binary tree, how do you find the maximum path sum?',
    options: [
      { text: 'Always pick right child', isCorrect: false },
      { text: 'Use DFS and track max sum including current node', isCorrect: true },
      { text: 'Use BFS', isCorrect: false },
      { text: 'Always go to largest value', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: 'Use DFS with recursion. At each node, calculate max path through that node, update global max, return max path to parent.'
  },
  {
    questionId: 15,
    category: 'Trees',
    topic: 'LCA',
    question: 'What does LCA stand for in tree problems?',
    options: [
      { text: 'Lowest Common Array', isCorrect: false },
      { text: 'Lowest Common Ancestor', isCorrect: true },
      { text: 'Largest Common Arc', isCorrect: false },
      { text: 'Left Child Ancestor', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'LCA is the deepest node that is ancestor of both given nodes. Useful in BST and general trees.'
  },

  // Graphs - 5 questions
  {
    questionId: 16,
    category: 'Graphs',
    topic: 'Graph Representation',
    question: 'Which representation is best for dense graphs?',
    options: [
      { text: 'Adjacency List', isCorrect: false },
      { text: 'Adjacency Matrix', isCorrect: true },
      { text: 'Edge List', isCorrect: false },
      { text: 'Incidence Matrix', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Adjacency Matrix uses O(V²) space but provides O(1) edge lookup. Best for dense graphs with many edges.'
  },
  {
    questionId: 17,
    category: 'Graphs',
    topic: 'DFS',
    question: 'What is the time complexity of DFS?',
    options: [
      { text: 'O(V + E)', isCorrect: true },
      { text: 'O(V * E)', isCorrect: false },
      { text: 'O(V²)', isCorrect: false },
      { text: 'O(E²)', isCorrect: false }
    ],
    correctAnswerIndex: 0,
    difficulty: 'Easy',
    explanation: 'DFS visits each vertex once and each edge once. Time: O(V + E) where V is vertices and E is edges.'
  },
  {
    questionId: 18,
    category: 'Graphs',
    topic: 'BFS',
    question: 'Which graph problem is BFS best suited for?',
    options: [
      { text: 'Finding strongly connected components', isCorrect: false },
      { text: 'Finding shortest path in unweighted graph', isCorrect: true },
      { text: 'Topological sorting', isCorrect: false },
      { text: 'Finding bridges', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'BFS explores level by level, guaranteeing shortest path in unweighted graphs. Uses queue data structure.'
  },
  {
    questionId: 19,
    category: 'Graphs',
    topic: 'Dijkstra',
    question: 'Why does Dijkstra\'s algorithm fail on graphs with negative edge weights?',
    options: [
      { text: 'It\'s just a limitation', isCorrect: false },
      { text: 'Because it uses greedy approach with wrong relaxation order', isCorrect: true },
      { text: 'Because computers can\'t handle negative numbers', isCorrect: false },
      { text: 'It actually works on negative edges', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: 'Dijkstra greedy selects minimum distance node, which fails if negative edges can later reduce distance. Use Bellman-Ford instead.'
  },
  {
    questionId: 20,
    category: 'Graphs',
    topic: 'Cycle Detection',
    question: 'How do you detect a cycle in an undirected graph?',
    options: [
      { text: 'Using DFS with parent tracking', isCorrect: true },
      { text: 'Check if any node has 2 edges', isCorrect: false },
      { text: 'Count edges and vertices', isCorrect: false },
      { text: 'Only in directed graphs', isCorrect: false }
    ],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: 'In DFS, if you visit a vertex already in recursion stack (except parent), cycle exists. Mark visited nodes to avoid revisiting.'
  },

  // Dynamic Programming - 5 questions
  {
    questionId: 21,
    category: 'Dynamic Programming',
    topic: 'DP Basics',
    question: 'What are the two key properties of problems suitable for DP?',
    options: [
      { text: 'Greedy choice and sorting', isCorrect: false },
      { text: 'Optimal substructure and overlapping subproblems', isCorrect: true },
      { text: 'Linear time and sorted input', isCorrect: false },
      { text: 'Divide and conquer only', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'DP requires: 1) Optimal solution from optimal solutions of subproblems, 2) Same subproblem solved multiple times.'
  },
  {
    questionId: 22,
    category: 'Dynamic Programming',
    topic: 'Fibonacci',
    question: 'What is the time complexity of calculating nth Fibonacci using memoization?',
    options: [
      { text: 'O(2^n)', isCorrect: false },
      { text: 'O(n)', isCorrect: true },
      { text: 'O(n²)', isCorrect: false },
      { text: 'O(log n)', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'With memoization, each number is calculated once. Time: O(n), Space: O(n) for cache and recursion stack.'
  },
  {
    questionId: 23,
    category: 'Dynamic Programming',
    topic: '0/1 Knapsack',
    question: 'In 0/1 Knapsack, what does each item state represent?',
    options: [
      { text: 'Whether to include item or not', isCorrect: true },
      { text: 'How many times to include item', isCorrect: false },
      { text: 'Weight of item', isCorrect: false },
      { text: 'Value of item', isCorrect: false }
    ],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: 'In 0/1 Knapsack, each item can be included (1) or excluded (0) exactly once. Time: O(n*W), Space: O(n*W).'
  },
  {
    questionId: 24,
    category: 'Dynamic Programming',
    topic: 'LCS',
    question: 'What is Longest Common Subsequence (LCS) time complexity?',
    options: [
      { text: 'O(m + n)', isCorrect: false },
      { text: 'O(m * n)', isCorrect: true },
      { text: 'O(m ^ n)', isCorrect: false },
      { text: 'O(log(m*n))', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: 'LCS uses 2D DP table. Time: O(m*n), Space: O(m*n) where m and n are string lengths.'
  },
  {
    questionId: 25,
    category: 'Dynamic Programming',
    topic: 'Coin Change',
    question: 'In Coin Change problem, what does DP[i] represent?',
    options: [
      { text: 'Number of coins', isCorrect: false },
      { text: 'Minimum coins needed to make amount i', isCorrect: true },
      { text: 'Maximum coins needed to make amount i', isCorrect: false },
      { text: 'Coin value at position i', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'DP[i] = minimum coins to make amount i. DP[i] = min(DP[i], DP[i-coin] + 1) for each coin ≤ i.'
  },

  // Sorting & Searching - 5 questions
  {
    questionId: 26,
    category: 'Sorting & Searching',
    topic: 'Sorting',
    question: 'Which sorting algorithm is stable and has O(n log n) worst-case complexity?',
    options: [
      { text: 'Quick Sort', isCorrect: false },
      { text: 'Merge Sort', isCorrect: true },
      { text: 'Heap Sort', isCorrect: false },
      { text: 'Insertion Sort', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Merge Sort maintains relative order of equal elements (stable) and guarantees O(n log n) in all cases. Space: O(n).'
  },
  {
    questionId: 27,
    category: 'Sorting & Searching',
    topic: 'Searching',
    question: 'Binary search requires what precondition?',
    options: [
      { text: 'Array has even length', isCorrect: false },
      { text: 'Array is sorted', isCorrect: true },
      { text: 'All elements are positive', isCorrect: false },
      { text: 'Array has no duplicates', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Binary search only works on sorted arrays. It divides search space in half each iteration. Time: O(log n).'
  },
  {
    questionId: 28,
    category: 'Sorting & Searching',
    topic: 'Sorting',
    question: 'What is the space complexity of Quick Sort?',
    options: [
      { text: 'O(1)', isCorrect: false },
      { text: 'O(log n)', isCorrect: true },
      { text: 'O(n)', isCorrect: false },
      { text: 'O(n log n)', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Quick Sort uses O(log n) space for recursion stack (in-place sorting). Average time: O(n log n), Worst: O(n²).'
  },
  {
    questionId: 29,
    category: 'Sorting & Searching',
    topic: 'Searching',
    question: 'In exponential search, what is the advantage over binary search?',
    options: [
      { text: 'Faster on sorted arrays', isCorrect: false },
      { text: 'Better for unbounded or infinite arrays', isCorrect: true },
      { text: 'Uses less space', isCorrect: false },
      { text: 'Handles duplicates better', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Hard',
    explanation: 'Exponential search finds range by doubling index, then binary searches. Useful when array is unbounded or infinite.'
  },
  {
    questionId: 30,
    category: 'Sorting & Searching',
    topic: 'Sorting',
    question: 'Which sorting is best for nearly sorted data?',
    options: [
      { text: 'Merge Sort', isCorrect: false },
      { text: 'Quick Sort', isCorrect: false },
      { text: 'Insertion Sort', isCorrect: true },
      { text: 'Selection Sort', isCorrect: false }
    ],
    correctAnswerIndex: 2,
    difficulty: 'Easy',
    explanation: 'Insertion Sort has O(n) best case for nearly sorted data and O(n²) worst case. Simple and efficient for small/nearly sorted arrays.'
  },

  // Linked Lists - 5 questions
  {
    questionId: 31,
    category: 'Linked Lists',
    topic: 'LL Basics',
    question: 'What is the advantage of Linked List over Array?',
    options: [
      { text: 'Faster search', isCorrect: false },
      { text: 'Dynamic size and efficient insertion/deletion', isCorrect: true },
      { text: 'Less memory usage', isCorrect: false },
      { text: 'Better for sorting', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Linked Lists grow dynamically and insertion/deletion at known position is O(1). Arrays need shifting for insertion/deletion.'
  },
  {
    questionId: 32,
    category: 'Linked Lists',
    topic: 'Reversal',
    question: 'How do you reverse a singly linked list iteratively?',
    options: [
      { text: 'Using stack', isCorrect: false },
      { text: 'Using three pointers: prev, curr, next', isCorrect: true },
      { text: 'Using recursion only', isCorrect: false },
      { text: 'Create new reversed list', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Iterate through list, reverse links using three pointers. curr points to next node, prev stores previous address.'
  },
  {
    questionId: 33,
    category: 'Linked Lists',
    topic: 'Cycle Detection',
    question: 'Floyd\'s Cycle Detection uses how many pointers?',
    options: [
      { text: 'One pointer', isCorrect: false },
      { text: 'Two pointers (slow and fast)', isCorrect: true },
      { text: 'Three pointers', isCorrect: false },
      { text: 'One for each node', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Floyd\'s algorithm: slow moves 1 step, fast moves 2 steps. If they meet, cycle exists. Time: O(n), Space: O(1).'
  },
  {
    questionId: 34,
    category: 'Linked Lists',
    topic: 'Merge',
    question: 'What is time complexity of merging two sorted linked lists?',
    options: [
      { text: 'O(n log n)', isCorrect: false },
      { text: 'O(n + m)', isCorrect: true },
      { text: 'O(n * m)', isCorrect: false },
      { text: 'O(log(n+m))', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Compare nodes from both lists and link smaller node. Each node visited once. Time: O(n+m), Space: O(1).'
  },
  {
    questionId: 35,
    category: 'Linked Lists',
    topic: 'Intersection',
    question: 'How do you find the intersection point of two linked lists?',
    options: [
      { text: 'Use hash set for all nodes of first list, then check second', isCorrect: true },
      { text: 'Compare all nodes with nested loops', isCorrect: false },
      { text: 'Only possible in special cases', isCorrect: false },
      { text: 'Use BFS', isCorrect: false }
    ],
    correctAnswerIndex: 0,
    difficulty: 'Medium',
    explanation: 'Store all nodes of first list in hash set, then iterate second list and check if node exists. Time: O(n+m), Space: O(n).'
  },

  // Stacks & Queues - 5 questions
  {
    questionId: 36,
    category: 'Stacks & Queues',
    topic: 'Stack Basics',
    question: 'What is LIFO?',
    options: [
      { text: 'Linear Input-First Output', isCorrect: false },
      { text: 'Last In First Out', isCorrect: true },
      { text: 'Left Input For Operation', isCorrect: false },
      { text: 'Longest Increasing For Output', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'LIFO: Last element added is first to be removed. Example: browser back button, undo functionality.'
  },
  {
    questionId: 37,
    category: 'Stacks & Queues',
    topic: 'Queue Basics',
    question: 'What is FIFO?',
    options: [
      { text: 'First Input For Output', isCorrect: false },
      { text: 'First In First Out', isCorrect: true },
      { text: 'Final Input Full Output', isCorrect: false },
      { text: 'Fast Integer Forward Output', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'FIFO: First element added is first to be removed. Example: printer queue, customer service lines.'
  },
  {
    questionId: 38,
    category: 'Stacks & Queues',
    topic: 'Valid Parentheses',
    question: 'Which data structure is best for matching parentheses?',
    options: [
      { text: 'Queue', isCorrect: false },
      { text: 'Stack', isCorrect: true },
      { text: 'Array', isCorrect: false },
      { text: 'Linked List', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Stack is LIFO - push opening brackets, pop and match with closing. Time: O(n), Space: O(n).'
  },
  {
    questionId: 39,
    category: 'Stacks & Queues',
    topic: 'Min Stack',
    question: 'How do you maintain minimum element in a stack efficiently?',
    options: [
      { text: 'Search entire stack each time', isCorrect: false },
      { text: 'Use auxiliary stack to store minimums', isCorrect: true },
      { text: 'Keep one pointer', isCorrect: false },
      { text: 'Sort before inserting', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Use two stacks: one for elements, one for minimums. Both push/pop synchronously. Time: O(1), Space: O(n).'
  },
  {
    questionId: 40,
    category: 'Stacks & Queues',
    topic: 'Deque',
    question: 'What is a Deque?',
    options: [
      { text: 'Stack with two ends', isCorrect: false },
      { text: 'Double Ended Queue', isCorrect: true },
      { text: 'Queue with priority', isCorrect: false },
      { text: 'Sorted Stack', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Deque allows insertion/deletion at both ends. Can be used as stack or queue. Time: O(1) for both operations.'
  },

  // Hashing - 5 questions
  {
    questionId: 41,
    category: 'Hashing',
    topic: 'Hash Table',
    question: 'What is the average time complexity for hash table operations?',
    options: [
      { text: 'O(n)', isCorrect: false },
      { text: 'O(1)', isCorrect: true },
      { text: 'O(log n)', isCorrect: false },
      { text: 'O(n log n)', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'With good hash function and load factor, average search/insert/delete is O(1). Worst case is O(n).'
  },
  {
    questionId: 42,
    category: 'Hashing',
    topic: 'Collision Handling',
    question: 'Which collision handling method uses linked lists?',
    options: [
      { text: 'Open Addressing', isCorrect: false },
      { text: 'Chaining', isCorrect: true },
      { text: 'Cuckoo Hashing', isCorrect: false },
      { text: 'Double Hashing', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Chaining: each bucket contains linked list of all colliding elements. Simple but uses extra space.'
  },
  {
    questionId: 43,
    category: 'Hashing',
    topic: 'Load Factor',
    question: 'What is load factor in hash table?',
    options: [
      { text: 'Number of collisions', isCorrect: false },
      { text: 'Ratio of elements to table size', isCorrect: true },
      { text: 'Number of hash functions', isCorrect: false },
      { text: 'Rehashing count', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Load Factor = n/m (n elements, m table size). When it exceeds threshold, rehash to larger table.'
  },
  {
    questionId: 44,
    category: 'Hashing',
    topic: 'Hash Function',
    question: 'What is a good property of hash function?',
    options: [
      { text: 'Always returns same bucket', isCorrect: false },
      { text: 'Distributes keys uniformly across buckets', isCorrect: true },
      { text: 'Minimizes memory usage', isCorrect: false },
      { text: 'Returns consecutive numbers', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'Good hash function minimizes collisions by distributing keys uniformly. Examples: modulo, multiplication, folding methods.'
  },
  {
    questionId: 45,
    category: 'Hashing',
    topic: 'Applications',
    question: 'What is the best use case for hash maps?',
    options: [
      { text: 'Sorted data storage', isCorrect: false },
      { text: 'Frequency counting and fast lookups', isCorrect: true },
      { text: 'Traversing in order', isCorrect: false },
      { text: 'Finding second largest element', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Hash maps excel at: counting frequencies, checking existence, storing key-value pairs, fast lookups. Time: O(1) average.'
  },

  // System Design - 5 questions
  {
    questionId: 46,
    category: 'System Design',
    topic: 'Scalability',
    question: 'What does horizontal scaling mean?',
    options: [
      { text: 'Increasing CPU/RAM of single server', isCorrect: false },
      { text: 'Adding more servers to distribute load', isCorrect: true },
      { text: 'Optimizing database queries', isCorrect: false },
      { text: 'Compressing data', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Horizontal scaling (scale-out): add more machines. Vertical scaling (scale-up): add more resources to existing machine.'
  },
  {
    questionId: 47,
    category: 'System Design',
    topic: 'Load Balancing',
    question: 'What is load balancing?',
    options: [
      { text: 'Storing data across servers', isCorrect: false },
      { text: 'Distributing requests across multiple servers', isCorrect: true },
      { text: 'Compressing network traffic', isCorrect: false },
      { text: 'Caching frequently used data', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Load balancer distributes incoming requests across backend servers using algorithms like round-robin, least connections.'
  },
  {
    questionId: 48,
    category: 'System Design',
    topic: 'Caching',
    question: 'What is the purpose of caching in system design?',
    options: [
      { text: 'Encrypt data', isCorrect: false },
      { text: 'Reduce response time by storing frequently accessed data', isCorrect: true },
      { text: 'Increase storage', isCorrect: false },
      { text: 'Improve code quality', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'Caching stores frequently accessed data in fast memory (Redis, Memcached). Reduces database load and latency.'
  },
  {
    questionId: 49,
    category: 'System Design',
    topic: 'Database',
    question: 'When should you use NoSQL over SQL?',
    options: [
      { text: 'Always use SQL', isCorrect: false },
      { text: 'Unstructured/variable schema data, high scalability needs', isCorrect: true },
      { text: 'Only for cache', isCorrect: false },
      { text: 'Never use NoSQL', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Medium',
    explanation: 'NoSQL: flexible schema, horizontal scalability, high write throughput. SQL: ACID compliance, complex queries, structured data.'
  },
  {
    questionId: 50,
    category: 'System Design',
    topic: 'API Design',
    question: 'What is REST?',
    options: [
      { text: 'Remote Executable Standard Template', isCorrect: false },
      { text: 'Representational State Transfer', isCorrect: true },
      { text: 'Real Estate Secure Transfer', isCorrect: false },
      { text: 'Remote Environment System Token', isCorrect: false }
    ],
    correctAnswerIndex: 1,
    difficulty: 'Easy',
    explanation: 'REST: architectural style using HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources via URLs.'
  }
];

module.exports = mcqData;
