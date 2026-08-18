const dsaQuestions = [
  // ── Arrays ──────────────────────────────────────────────────
  {
    dsaNumber: 1,
    title: "Two Sum",
    problem:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. You may not use the same element twice.",
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) return [map.get(complement), i];
    map.set(nums[i], i);
  }
  return [];
}`,
    approach:
      "Use a hash map to store each number's index as you iterate. For every element, check if its complement (target - element) is already in the map. This gives O(n) time instead of O(n²) brute force.",
    topic: "Arrays",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["hash map", "array", "classic"],
  },
  {
    dsaNumber: 2,
    title: "Maximum Subarray (Kadane's Algorithm)",
    problem:
      "Given an integer array `nums`, find the contiguous subarray with the largest sum and return its sum.",
    solution: `function maxSubArray(nums) {
  let maxSum = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }
  return maxSum;
}`,
    approach:
      "Kadane's Algorithm: maintain a running sum. At each element, decide whether to extend the previous subarray or start fresh. Update the global max at every step.",
    topic: "Arrays",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["dynamic programming", "greedy", "subarray"],
  },
  {
    dsaNumber: 3,
    title: "Best Time to Buy and Sell Stock",
    problem:
      "Given an array `prices` where `prices[i]` is the stock price on day i, find the maximum profit from a single buy-sell transaction. Return 0 if no profit is possible.",
    solution: `function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else if (price - minPrice > maxProfit) maxProfit = price - minPrice;
  }
  return maxProfit;
}`,
    approach:
      "Track the minimum price seen so far. At each step, compute profit if we sold today, and update the max profit. Single pass, O(n).",
    topic: "Arrays",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["greedy", "array", "stocks"],
  },

  // ── Strings ────────────────────────────────────────────────
  {
    dsaNumber: 4,
    title: "Valid Anagram",
    problem:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.",
    solution: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = {};
  for (const c of s) count[c] = (count[c] || 0) + 1;
  for (const c of t) {
    if (!count[c]) return false;
    count[c]--;
  }
  return true;
}`,
    approach:
      "Count character frequencies of `s` using a hash map, then decrement for each character in `t`. If any count goes below 0 or a character is missing, return false.",
    topic: "Strings",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["hash map", "string", "frequency"],
  },
  {
    dsaNumber: 5,
    title: "Longest Substring Without Repeating Characters",
    problem:
      "Given a string `s`, find the length of the longest substring without repeating characters.",
    solution: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, max = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) { set.delete(s[left]); left++; }
    set.add(s[right]);
    max = Math.max(max, right - left + 1);
  }
  return max;
}`,
    approach:
      "Sliding window with a Set. Expand right pointer; when a duplicate is found, shrink from the left until the duplicate is removed. Track the maximum window size.",
    topic: "Strings",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(min(n,m))",
    tags: ["sliding window", "set", "string"],
  },

  // ── Linked Lists ───────────────────────────────────────────
  {
    dsaNumber: 6,
    title: "Reverse a Linked List",
    problem:
      "Given the head of a singly linked list, reverse the list and return the reversed list's head.",
    solution: `function reverseList(head) {
  let prev = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
    approach:
      "Iterative three-pointer approach: keep track of `prev`, `curr`, and `next`. At each step, reverse the current node's pointer, then advance all three pointers forward.",
    topic: "Linked Lists",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["linked list", "iterative", "pointers"],
  },
  {
    dsaNumber: 7,
    title: "Detect Cycle in Linked List",
    problem:
      "Given the head of a linked list, determine if the linked list has a cycle in it.",
    solution: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
    approach:
      "Floyd's Tortoise and Hare: use two pointers — slow moves one step, fast moves two steps. If there's a cycle, they will eventually meet. If fast reaches null, there's no cycle.",
    topic: "Linked Lists",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["two pointers", "linked list", "Floyd's"],
  },

  // ── Stacks & Queues ────────────────────────────────────────
  {
    dsaNumber: 8,
    title: "Valid Parentheses",
    problem:
      "Given a string `s` containing just `(`, `)`, `{`, `}`, `[`, `]`, determine if the input string is valid. An open bracket must be closed by the same type of bracket in the correct order.",
    solution: `function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (const c of s) {
    if ('([{'.includes(c)) stack.push(c);
    else if (stack.pop() !== map[c]) return false;
  }
  return stack.length === 0;
}`,
    approach:
      "Use a stack. Push opening brackets. For every closing bracket, check if the top of the stack matches. At the end, the stack must be empty.",
    topic: "Stacks & Queues",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    tags: ["stack", "string", "brackets"],
  },

  // ── Trees ──────────────────────────────────────────────────
  {
    dsaNumber: 9,
    title: "Maximum Depth of Binary Tree",
    problem:
      "Given the root of a binary tree, return its maximum depth — the number of nodes along the longest path from root to the farthest leaf.",
    solution: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
    approach:
      "Recursive DFS: the depth of a node is 1 plus the maximum depth of its two subtrees. Base case: null node has depth 0.",
    topic: "Trees",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h) — h is tree height",
    tags: ["recursion", "DFS", "binary tree"],
  },
  {
    dsaNumber: 10,
    title: "Validate Binary Search Tree",
    problem:
      "Given the root of a binary tree, determine if it is a valid BST. A valid BST has all left descendants less than the node, and all right descendants greater.",
    solution: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) &&
         isValidBST(root.right, root.val, max);
}`,
    approach:
      "Pass valid range [min, max] to each recursive call. Left subtree must be < current value; right subtree must be > current value. Update bounds at each level.",
    topic: "Trees",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)",
    tags: ["BST", "recursion", "tree validation"],
  },

  // ── Graphs ─────────────────────────────────────────────────
  {
    dsaNumber: 11,
    title: "Number of Islands",
    problem:
      "Given an m×n grid of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    solution: `function numIslands(grid) {
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] !== '1') return;
    grid[r][c] = '0'; // mark visited
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  for (let r = 0; r < grid.length; r++)
    for (let c = 0; c < grid[0].length; c++)
      if (grid[r][c] === '1') { dfs(r, c); count++; }
  return count;
}`,
    approach:
      "DFS flood fill: whenever a '1' is found, increment count and DFS to mark all connected '1's as visited (set to '0'). Count equals the number of DFS calls from the outer loop.",
    topic: "Graphs",
    difficulty: "Medium",
    timeComplexity: "O(m×n)",
    spaceComplexity: "O(m×n)",
    tags: ["DFS", "BFS", "graph", "grid"],
  },

  // ── Dynamic Programming ────────────────────────────────────
  {
    dsaNumber: 12,
    title: "Climbing Stairs",
    problem:
      "You can climb 1 or 2 steps at a time. Given n steps, how many distinct ways can you reach the top?",
    solution: `function climbStairs(n) {
  if (n <= 2) return n;
  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}`,
    approach:
      "Classic DP — it's Fibonacci: ways(n) = ways(n-1) + ways(n-2). Use two variables instead of an array to achieve O(1) space.",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["fibonacci", "DP", "bottom-up"],
  },
  {
    dsaNumber: 13,
    title: "Coin Change",
    problem:
      "Given an array of coin denominations and a target amount, return the fewest number of coins needed to make that amount. Return -1 if it's impossible.",
    solution: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++)
    for (const coin of coins)
      if (coin <= i) dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
    approach:
      "Bottom-up DP: dp[i] = min coins to make amount i. For each amount, try every coin and take the minimum. Build up from 0 to the target.",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    timeComplexity: "O(amount × coins)",
    spaceComplexity: "O(amount)",
    tags: ["DP", "BFS", "optimization"],
  },

  // ── Sorting & Searching ────────────────────────────────────
  {
    dsaNumber: 14,
    title: "Binary Search",
    problem:
      "Given a sorted array of integers and a target value, return the index of the target. If not found, return -1.",
    solution: `function binarySearch(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
    approach:
      "Repeatedly halve the search space. Compare the middle element to the target; eliminate the half that can't contain the target. Loop until found or space is empty.",
    topic: "Sorting & Searching",
    difficulty: "Easy",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    tags: ["binary search", "sorted array", "divide and conquer"],
  },

  // ── Two Pointers ───────────────────────────────────────────
  {
    dsaNumber: 15,
    title: "3Sum",
    problem:
      "Given an integer array nums, return all triplets [nums[i], nums[j], nums[k]] such that i ≠ j ≠ k and nums[i] + nums[j] + nums[k] === 0. No duplicate triplets.",
    solution: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i-1]) continue;
    let left = i + 1, right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        while (left < right && nums[left] === nums[left+1]) left++;
        while (left < right && nums[right] === nums[right-1]) right--;
        left++; right--;
      } else if (sum < 0) left++;
      else right--;
    }
  }
  return result;
}`,
    approach:
      "Sort the array. Fix one element (i), then use two pointers (left, right) to find pairs that sum to -nums[i]. Skip duplicates at every step to avoid repeated triplets.",
    topic: "Two Pointers",
    difficulty: "Medium",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    tags: ["two pointers", "sorting", "array"],
  },

  // ── Sliding Window ─────────────────────────────────────────
  {
    dsaNumber: 16,
    title: "Maximum Average Subarray",
    problem:
      "Given an integer array `nums` and integer `k`, find the contiguous subarray of length `k` that has the maximum average and return that average.",
    solution: `function findMaxAverage(nums, k) {
  let sum = nums.slice(0, k).reduce((a, b) => a + b, 0);
  let max = sum;
  for (let i = k; i < nums.length; i++) {
    sum += nums[i] - nums[i - k];
    max = Math.max(max, sum);
  }
  return max / k;
}`,
    approach:
      "Fixed-size sliding window: compute initial window sum, then slide by adding the new element and removing the leftmost one. Track the maximum window sum.",
    topic: "Sliding Window",
    difficulty: "Easy",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["sliding window", "array", "average"],
  },

  // ── Hashing ────────────────────────────────────────────────
  {
    dsaNumber: 17,
    title: "Group Anagrams",
    problem:
      "Given an array of strings `strs`, group the anagrams together and return them as a list of groups.",
    solution: `function groupAnagrams(strs) {
  const map = new Map();
  for (const s of strs) {
    const key = s.split('').sort().join('');
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(s);
  }
  return [...map.values()];
}`,
    approach:
      "Anagrams produce the same sorted string. Use a hash map where keys are sorted strings and values are lists of original strings that produce that key.",
    topic: "Hashing",
    difficulty: "Medium",
    timeComplexity: "O(n·k·log k) — k is max string length",
    spaceComplexity: "O(n·k)",
    tags: ["hash map", "sorting", "string"],
  },

  // ── Recursion ──────────────────────────────────────────────
  {
    dsaNumber: 18,
    title: "Subsets (Power Set)",
    problem:
      "Given an integer array `nums` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    solution: `function subsets(nums) {
  const result = [[]];
  for (const num of nums)
    result.push(...result.map(sub => [...sub, num]));
  return result;
}`,
    approach:
      "Iterative bit-mask approach: start with an empty subset. For each number, duplicate all existing subsets and append the new number to each duplicate.",
    topic: "Recursion",
    difficulty: "Medium",
    timeComplexity: "O(2^n)",
    spaceComplexity: "O(2^n)",
    tags: ["backtracking", "recursion", "bit manipulation"],
  },

  // ── Backtracking ───────────────────────────────────────────
  {
    dsaNumber: 19,
    title: "Permutations",
    problem:
      "Given an array `nums` of distinct integers, return all possible permutations.",
    solution: `function permute(nums) {
  const result = [];
  const bt = (path, remaining) => {
    if (!remaining.length) { result.push(path); return; }
    for (let i = 0; i < remaining.length; i++)
      bt([...path, remaining[i]], [...remaining.slice(0,i), ...remaining.slice(i+1)]);
  };
  bt([], nums);
  return result;
}`,
    approach:
      "Backtracking: at each step, pick one element from the remaining pool, add it to the current path, and recurse on the rest. Backtrack by trying the next element.",
    topic: "Backtracking",
    difficulty: "Medium",
    timeComplexity: "O(n × n!)",
    spaceComplexity: "O(n!)",
    tags: ["backtracking", "recursion", "permutation"],
  },

  // ── Greedy ────────────────────────────────────────────────
  {
    dsaNumber: 20,
    title: "Jump Game",
    problem:
      "Given an array `nums` where each element represents your maximum jump length at that position, return true if you can reach the last index starting from index 0.",
    solution: `function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}`,
    approach:
      "Greedy: track the farthest index reachable so far. At each index, if the current index exceeds maxReach, it's unreachable — return false. Otherwise update maxReach.",
    topic: "Greedy",
    difficulty: "Medium",
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)",
    tags: ["greedy", "array", "jump"],
  },

// ── Heaps ───────────────────────────────────────────────────
// ── Arrays ────────────────────────────────────────────────
{
  dsaNumber: 21,
  title: "Product of Array Except Self",
  problem: "Given an integer array nums, return an array answer such that answer[i] is the product of all elements except nums[i].",
  solution: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = Array(n).fill(1);
    let prefix = 1, suffix = 1;
    for (let i = 0; i < n; i++) {
      res[i] = prefix;
      prefix *= nums[i];
    }
    for (let i = n - 1; i >= 0; i--) {
      res[i] *= suffix;
      suffix *= nums[i];
    }
    return res;
  }`,
  approach: "Use prefix and suffix products to avoid division. Two passes give O(n) time and O(1) extra space.",
  topic: "Arrays",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["array", "prefix", "suffix"],
},

{
  dsaNumber: 22,
  title: "Merge Intervals",
  problem: "Given an array of intervals, merge all overlapping intervals.",
  solution: `function merge(intervals) {
    intervals.sort((a,b)=>a[0]-b[0]);
    const res=[intervals[0]];
    for (let i=1;i<intervals.length;i++) {
      const last=res[res.length-1];
      if (intervals[i][0]<=last[1]) last[1]=Math.max(last[1],intervals[i][1]);
      else res.push(intervals[i]);
    }
    return res;
  }`,
  approach: "Sort by start time, then merge overlapping intervals greedily.",
  topic: "Arrays",
  difficulty: "Medium",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  tags: ["array", "intervals", "sorting"],
},

// ── Strings ───────────────────────────────────────────────
{
  dsaNumber: 23,
  title: "Palindrome Partitioning",
  problem: "Partition a string into all possible palindrome substrings.",
  solution: `function partition(s) {
    const res=[], path=[];
    const isPal=(str,l,r)=>{
      while(l<r) if(str[l++]!==str[r--]) return false;
      return true;
    };
    const backtrack=(start)=>{
      if(start===s.length){res.push([...path]);return;}
      for(let end=start;end<s.length;end++){
        if(isPal(s,start,end)){
          path.push(s.slice(start,end+1));
          backtrack(end+1);
          path.pop();
        }
      }
    };
    backtrack(0);
    return res;
  }`,
  approach: "Backtracking with palindrome check at each step.",
  topic: "Strings",
  difficulty: "Medium",
  timeComplexity: "O(n·2^n)",
  spaceComplexity: "O(n)",
  tags: ["string", "backtracking", "palindrome"],
},

{
  dsaNumber: 24,
  title: "Longest Palindromic Substring",
  problem: "Given a string s, return the longest palindromic substring.",
  solution: `function longestPalindrome(s) {
    let res="";
    const expand=(l,r)=>{
      while(l>=0 && r<s.length && s[l]===s[r]){
        if(r-l+1>res.length) res=s.slice(l,r+1);
        l--;r++;
      }
    };
    for(let i=0;i<s.length;i++){
      expand(i,i);
      expand(i,i+1);
    }
    return res;
  }`,
  approach: "Expand around center for each index.",
  topic: "Strings",
  difficulty: "Medium",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  tags: ["string", "palindrome", "two pointers"],
},

// ── Linked Lists ──────────────────────────────────────────
{
  dsaNumber: 25,
  title: "Merge Two Sorted Lists",
  problem: "Merge two sorted linked lists and return as a new sorted list.",
  solution: `function mergeTwoLists(l1,l2){
    const dummy={next:null}; let curr=dummy;
    while(l1 && l2){
      if(l1.val<l2.val){curr.next=l1;l1=l1.next;}
      else{curr.next=l2;l2=l2.next;}
      curr=curr.next;
    }
    curr.next=l1||l2;
    return dummy.next;
  }`,
  approach: "Iteratively merge nodes by comparing heads.",
  topic: "Linked Lists",
  difficulty: "Easy",
  timeComplexity: "O(n+m)",
  spaceComplexity: "O(1)",
  tags: ["linked list", "merge"],
},

{
  dsaNumber: 26,
  title: "Remove Nth Node From End",
  problem: "Remove the nth node from the end of a linked list.",
  solution: `function removeNthFromEnd(head,n){
    const dummy={next:head}; let slow=dummy,fast=dummy;
    for(let i=0;i<=n;i++) fast=fast.next;
    while(fast){slow=slow.next;fast=fast.next;}
    slow.next=slow.next.next;
    return dummy.next;
  }`,
  approach: "Two-pointer technique with dummy node.",
  topic: "Linked Lists",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["linked list", "two pointers"],
},

// ── Stacks & Queues ───────────────────────────────────────
{
  dsaNumber: 27,
  title: "Min Stack",
  problem: "Design a stack that supports push, pop, top, and retrieving minimum in O(1).",
  solution: `class MinStack{
    constructor(){this.stack=[];this.min=[];}
    push(x){this.stack.push(x);this.min.push(this.min.length?Math.min(x,this.min[this.min.length-1]):x);}
    pop(){this.stack.pop();this.min.pop();}
    top(){return this.stack[this.stack.length-1];}
    getMin(){return this.min[this.min.length-1];}
  }`,
  approach: "Maintain auxiliary stack for minimums.",
  topic: "Stacks & Queues",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(n)",
  tags: ["stack", "design"],
},

{
  dsaNumber: 28,
  title: "Implement Queue using Stacks",
  problem: "Implement a queue using two stacks.",
  solution: `class MyQueue{
    constructor(){this.in=[];this.out=[];}
    push(x){this.in.push(x);}
    pop(){if(!this.out.length) while(this.in.length) this.out.push(this.in.pop()); return this.out.pop();}
    peek(){if(!this.out.length) while(this.in.length) this.out.push(this.in.pop()); return this.out[this.out.length-1];}
    empty(){return !this.in.length && !this.out.length;}
  }`,
  approach: "Use two stacks: in-stack for push, out-stack for pop/peek.",
  topic: "Stacks & Queues",
  difficulty: "Easy",
  timeComplexity: "Amortized O(1)",
  spaceComplexity: "O(n)",
  tags: ["stack", "queue"],
},

// ── Trees ─────────────────────────────────────────────────
{
  dsaNumber: 29,
  title: "Binary Tree Level Order Traversal",
  problem: "Return level order traversal of a binary tree.",
  solution: `function levelOrder(root){
    if(!root) return [];
    const res=[],q=[root];
    while(q.length){
      const size=q.length,level=[];
      for(let i=0;i<size;i++){
        const node=q.shift();
        level.push(node.val);
        if(node.left) q.push(node.left);
        if(node.right) q.push(node.right);
      }
      res.push(level);
    }
    return res;
  }`,
  approach: "BFS using queue.",
  topic: "Trees",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["tree", "BFS"],
},

// ── Trees ────────────────────────────────────────────────
{
  dsaNumber: 30,
  title: "Lowest Common Ancestor of BST",
  problem: "Find the lowest common ancestor of two nodes in a BST.",
  solution: `function lowestCommonAncestor(root,p,q){
    while(root){
      if(p.val<root.val && q.val<root.val) root=root.left;
      else if(p.val>root.val && q.val>root.val) root=root.right;
      else return root;
    }
  }`,
  approach: "Traverse down BST; split point is the LCA.",
  topic: "Trees",
  difficulty: "Easy",
  timeComplexity: "O(h)",
  spaceComplexity: "O(1)",
  tags: ["BST","tree","ancestor"],
},

{
  dsaNumber: 31,
  title: "Serialize and Deserialize Binary Tree",
  problem: "Design an algorithm to serialize and deserialize a binary tree.",
  solution: `function serialize(root){
    if(!root) return "null,";
    return root.val+","+
      serialize(root.left)+
      serialize(root.right);
  }
  function deserialize(data){
    const vals=data.split(",");
    let i=0;
    function build(){
      if(vals[i]==="null"){i++;return null;}
      const node={val:parseInt(vals[i++])};
      node.left=build();
      node.right=build();
      return node;
    }
    return build();
  }`,
  approach: "Preorder traversal with null markers.",
  topic: "Trees",
  difficulty: "Hard",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["tree","serialization","DFS"],
},

// ── Graphs ───────────────────────────────────────────────
{
  dsaNumber: 32,
  title: "Clone Graph",
  problem: "Clone an undirected graph given a node reference.",
  solution: `function cloneGraph(node){
    if(!node) return null;
    const map=new Map();
    const dfs=(n)=>{
      if(map.has(n)) return map.get(n);
      const copy={val:n.val,neighbors:[]};
      map.set(n,copy);
      for(const nei of n.neighbors)
        copy.neighbors.push(dfs(nei));
      return copy;
    };
    return dfs(node);
  }`,
  approach: "DFS with hash map to avoid cycles.",
  topic: "Graphs",
  difficulty: "Medium",
  timeComplexity: "O(V+E)",
  spaceComplexity: "O(V)",
  tags: ["graph","DFS","clone"],
},

{
  dsaNumber: 33,
  title: "Pacific Atlantic Water Flow",
  problem: "Find cells where water can flow to both Pacific and Atlantic oceans.",
  solution: `function pacificAtlantic(heights){
    const m=heights.length,n=heights[0].length;
    const pac=new Set(),atl=new Set();
    const dfs=(r,c,vis,prev)=>{
      if(r<0||c<0||r>=m||c>=n||vis.has(r+","+c)||heights[r][c]<prev) return;
      vis.add(r+","+c);
      dfs(r+1,c,vis,heights[r][c]);
      dfs(r-1,c,vis,heights[r][c]);
      dfs(r,c+1,vis,heights[r][c]);
      dfs(r,c-1,vis,heights[r][c]);
    };
    for(let i=0;i<m;i++){dfs(i,0,pac,-Infinity);dfs(i,n-1,atl,-Infinity);}
    for(let j=0;j<n;j++){dfs(0,j,pac,-Infinity);dfs(m-1,j,atl,-Infinity);}
    const res=[];
    for(let i=0;i<m;i++)for(let j=0;j<n;j++)
      if(pac.has(i+","+j)&&atl.has(i+","+j)) res.push([i,j]);
    return res;
  }`,
  approach: "DFS from ocean borders; intersection gives result.",
  topic: "Graphs",
  difficulty: "Medium",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",
  tags: ["graph","DFS","matrix"],
},

// ── Dynamic Programming ──────────────────────────────────
{
  dsaNumber: 34,
  title: "Longest Increasing Subsequence",
  problem: "Find length of longest increasing subsequence in array.",
  solution: `function lengthOfLIS(nums){
    const dp=[];
    for(const n of nums){
      let l=0,r=dp.length;
      while(l<r){
        const mid=Math.floor((l+r)/2);
        if(dp[mid]<n) l=mid+1; else r=mid;
      }
      dp[l]=n;
    }
    return dp.length;
  }`,
  approach: "Patience sorting with binary search.",
  topic: "Dynamic Programming",
  difficulty: "Medium",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  tags: ["DP","binary search","LIS"],
},

{
  dsaNumber: 35,
  title: "Edit Distance",
  problem: "Compute minimum operations to convert word1 to word2.",
  solution: `function minDistance(a,b){
    const m=a.length,n=b.length;
    const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=i;
    for(let j=0;j<=n;j++) dp[0][j]=j;
    for(let i=1;i<=m;i++)
      for(let j=1;j<=n;j++)
        dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:
          1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
    return dp[m][n];
  }`,
  approach: "Classic DP with 2D table.",
  topic: "Dynamic Programming",
  difficulty: "Hard",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",
  tags: ["DP","string","edit distance"],
},

// ── Sorting & Searching ──────────────────────────────────
{
  dsaNumber: 36,
  title: "Search in Rotated Sorted Array",
  problem: "Search target in rotated sorted array.",
  solution: `function search(nums,target){
    let l=0,r=nums.length-1;
    while(l<=r){
      const mid=Math.floor((l+r)/2);
      if(nums[mid]===target) return mid;
      if(nums[l]<=nums[mid]){
        if(nums[l]<=target&&target<nums[mid]) r=mid-1;
        else l=mid+1;
      }else{
        if(nums[mid]<target&&target<=nums[r]) l=mid+1;
        else r=mid-1;
      }
    }
    return -1;
  }`,
  approach: "Modified binary search.",
  topic: "Sorting & Searching",
  difficulty: "Medium",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  tags: ["binary search","array"],
},

{
  dsaNumber: 37,
  title: "Median of Two Sorted Arrays",
  problem: "Find median of two sorted arrays.",
  solution: `function findMedianSortedArrays(a,b){
    const nums=[...a,...b].sort((x,y)=>x-y);
    const n=nums.length;
    return n%2?nums[Math.floor(n/2)]:(nums[n/2-1]+nums[n/2])/2;
  }`,
  approach: "Merge and sort; optimal uses binary search partition.",
  topic: "Sorting & Searching",
  difficulty: "Hard",
  timeComplexity: "O((m+n) log(m+n))",
  spaceComplexity: "O(m+n)",
  tags: ["array","median","binary search"],
},

// ── Recursion ────────────────────────────────────────────
{
  dsaNumber: 38,
  title: "Generate Parentheses",
  problem: "Generate all combinations of n pairs of parentheses.",
  solution: `function generateParenthesis(n){
    const res=[];
    const backtrack=(s,l,r)=>{
      if(s.length===2*n){res.push(s);return;}
      if(l<n) backtrack(s+"(",l+1,r);
      if(r<l) backtrack(s+")",l,r+1);
    };
    backtrack("",0,0);
    return res;
  }`,
  approach: "Backtracking with constraints on left/right counts.",
  topic: "Recursion",
  difficulty: "Medium",
  timeComplexity: "O(2^n)",
  spaceComplexity: "O(n)",
  tags: ["recursion","backtracking","string"],
},

// ── Recursion ────────────────────────────────────────────
{
  dsaNumber: 39,
  title: "Combination Sum",
  problem: "Given an array of distinct integers and a target, return all unique combinations where the chosen numbers sum to target.",
  solution: `function combinationSum(candidates, target) {
    const res = [];
    const dfs = (start, path, sum) => {
      if (sum === target) { res.push([...path]); return; }
      if (sum > target) return;
      for (let i = start; i < candidates.length; i++) {
        path.push(candidates[i]);
        dfs(i, path, sum + candidates[i]);
        path.pop();
      }
    };
    dfs(0, [], 0);
    return res;
  }`,
  approach: "Backtracking with recursion; allow reuse of same element by not incrementing index.",
  topic: "Recursion",
  difficulty: "Medium",
  timeComplexity: "O(2^n)",
  spaceComplexity: "O(n)",
  tags: ["recursion","backtracking","array"],
},

{
  dsaNumber: 40,
  title: "Letter Combinations of Phone Number",
  problem: "Given a digit string, return all possible letter combinations based on phone keypad mapping.",
  solution: `function letterCombinations(digits) {
    if (!digits.length) return [];
    const map = {2:"abc",3:"def",4:"ghi",5:"jkl",6:"mno",7:"pqrs",8:"tuv",9:"wxyz"};
    const res = [];
    const dfs = (i, path) => {
      if (i === digits.length) { res.push(path); return; }
      for (const c of map[digits[i]]) dfs(i+1, path+c);
    };
    dfs(0,"");
    return res;
  }`,
  approach: "Recursive DFS building strings digit by digit.",
  topic: "Recursion",
  difficulty: "Medium",
  timeComplexity: "O(4^n)",
  spaceComplexity: "O(n)",
  tags: ["recursion","DFS","string"],
},

// ── Hashing ──────────────────────────────────────────────
{
  dsaNumber: 41,
  title: "Longest Consecutive Sequence",
  problem: "Find length of longest consecutive elements sequence in array.",
  solution: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (const n of set) {
      if (!set.has(n-1)) {
        let length = 1;
        while (set.has(n+length)) length++;
        longest = Math.max(longest,length);
      }
    }
    return longest;
  }`,
  approach: "Use hash set to check consecutive runs starting from sequence heads.",
  topic: "Hashing",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["hash set","array","sequence"],
},

{
  dsaNumber: 42,
  title: "Two Sum II - Input Array Sorted",
  problem: "Given sorted array, find two numbers that sum to target.",
  solution: `function twoSumSorted(nums,target){
    let l=0,r=nums.length-1;
    while(l<r){
      const sum=nums[l]+nums[r];
      if(sum===target) return [l+1,r+1];
      if(sum<target) l++; else r--;
    }
  }`,
  approach: "Two-pointer technique on sorted array.",
  topic: "Hashing",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["two pointers","array"],
},

// ── Heaps ────────────────────────────────────────────────
{
  dsaNumber: 43,
  title: "Merge K Sorted Lists",
  problem: "Merge k sorted linked lists into one sorted list.",
  solution: `function mergeKLists(lists){
    const arr=[];
    for(const l of lists){
      let node=l;
      while(node){arr.push(node.val);node=node.next;}
    }
    arr.sort((a,b)=>a-b);
    const dummy={next:null}; let curr=dummy;
    for(const v of arr){curr.next={val:v};curr=curr.next;}
    return dummy.next;
  }`,
  approach: "Collect all values, sort, rebuild list. Optimal uses min-heap.",
  topic: "Heaps",
  difficulty: "Hard",
  timeComplexity: "O(N log N)",
  spaceComplexity: "O(N)",
  tags: ["heap","linked list","merge"],
},

{
  dsaNumber: 44,
  title: "Find Median from Data Stream",
  problem: "Design structure to add numbers and find median.",
  solution: `class MedianFinder{
    constructor(){this.arr=[];}
    addNum(num){this.arr.push(num);this.arr.sort((a,b)=>a-b);}
    findMedian(){
      const n=this.arr.length;
      return n%2?this.arr[Math.floor(n/2)]:(this.arr[n/2-1]+this.arr[n/2])/2;
    }
  }`,
  approach: "Maintain sorted array; optimal uses two heaps.",
  topic: "Heaps",
  difficulty: "Hard",
  timeComplexity: "O(n log n)",
  spaceComplexity: "O(n)",
  tags: ["heap","design","median"],
},

// ── Two Pointers ─────────────────────────────────────────
{
  dsaNumber: 45,
  title: "Container With Most Water",
  problem: "Find max area formed by lines in array.",
  solution: `function maxArea(height){
    let l=0,r=height.length-1,max=0;
    while(l<r){
      max=Math.max(max,(r-l)*Math.min(height[l],height[r]));
      if(height[l]<height[r]) l++; else r--;
    }
    return max;
  }`,
  approach: "Two-pointer shrinking window to maximize area.",
  topic: "Two Pointers",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["two pointers","array"],
},

{
  dsaNumber: 46,
  title: "Remove Duplicates from Sorted Array",
  problem: "Remove duplicates in-place from sorted array.",
  solution: `function removeDuplicates(nums){
    let i=0;
    for(const n of nums) if(i<1||n!==nums[i-1]) nums[i++]=n;
    return i;
  }`,
  approach: "Two-pointer overwrite technique.",
  topic: "Two Pointers",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["two pointers","array"],
},

// ── Sliding Window ───────────────────────────────────────
{
  dsaNumber: 47,
  title: "Minimum Window Substring",
  problem: "Find smallest substring of s containing all chars of t.",
  solution: `function minWindow(s,t){
    const need={},have={};
    for(const c of t) need[c]=(need[c]||0)+1;
    let l=0,count=0,res="";
    for(let r=0;r<s.length;r++){
      const c=s[r]; have[c]=(have[c]||0)+1;
      if(have[c]===need[c]) count++;
      while(count===Object.keys(need).length){
        if(!res||r-l+1<res.length) res=s.slice(l,r+1);
        have[s[l]]--; if(have[s[l]]<need[s[l]]) count--;
        l++;
      }
    }
    return res;
  }`,
  approach: "Sliding window with hash maps.",
  topic: "Sliding Window",
  difficulty: "Hard",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["sliding window","string"],
},

{
  dsaNumber: 48,
  title: "Permutation in String",
  problem: "Check if s2 contains a permutation of s1.",
  solution: `function checkInclusion(s1,s2){
    const need={},have={};
    for(const c of s1) need[c]=(need[c]||0)+1;
    let l=0,count=0;
    for(let r=0;r<s2.length;r++){
      const c=s2[r]; have[c]=(have[c]||0)+1;
      if(have[c]===need[c]) count++;
      if(r-l+1>s1.length){
        if(have[s2[l]]===need[s2[l]]) count--;
        have[s2[l]]--; l++;
      }
      if(count===Object.keys(need).length) return true;
    }
    return false;
  }`,
  approach: "Sliding window of length s1 with frequency maps.",
  topic: "Sliding Window",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["sliding window","string"],
},

// ── Backtracking ─────────────────────────────────────────
{
  dsaNumber: 49,
  title: "Sudoku Solver",
  problem: "Write a program to solve a Sudoku puzzle by filling empty cells. The solution must satisfy Sudoku rules.",
  solution: `function solveSudoku(board) {
    const isValid = (r,c,n) => {
      for (let i=0;i<9;i++) {
        if (board[r][i]==n || board[i][c]==n) return false;
        const row=3*Math.floor(r/3)+Math.floor(i/3);
        const col=3*Math.floor(c/3)+i%3;
        if (board[row][col]==n) return false;
      }
      return true;
    };
    const dfs = () => {
      for (let r=0;r<9;r++) {
        for (let c=0;c<9;c++) {
          if (board[r][c]===".") {
            for (let n=1;n<=9;n++) {
              const ch=String(n);
              if (isValid(r,c,ch)) {
                board[r][c]=ch;
                if (dfs()) return true;
                board[r][c]=".";
              }
            }
            return false;
          }
        }
      }
      return true;
    };
    dfs();
  }`,
  approach: "Backtracking with constraint checking for rows, columns, and subgrids.",
  topic: "Backtracking",
  difficulty: "Hard",
  timeComplexity: "O(9^(n))",
  spaceComplexity: "O(1)",
  tags: ["backtracking","recursion","sudoku"],
},

// ── Greedy ───────────────────────────────────────────────
{
  dsaNumber: 50,
  title: "Gas Station",
  problem: "There are n gas stations arranged in a circle. Given gas[i] and cost[i], return the starting station index if you can travel around once, otherwise -1.",
  solution: `function canCompleteCircuit(gas,cost){
    let total=0,tank=0,start=0;
    for(let i=0;i<gas.length;i++){
      total+=gas[i]-cost[i];
      tank+=gas[i]-cost[i];
      if(tank<0){start=i+1;tank=0;}
    }
    return total>=0?start:-1;
  }`,
  approach: "Greedy: if tank drops below 0, reset start to next station. If total gas >= total cost, solution exists.",
  topic: "Greedy",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["greedy","array","gas station"],
},
// ── Bit Manipulation ─────────────────────────────────────
{
  dsaNumber: 51,
  title: "Single Number",
  problem: "Given a non-empty array of integers, every element appears twice except one. Find that single one.",
  solution: `function singleNumber(nums) {
    return nums.reduce((a,b)=>a^b);
  }`,
  approach: "Use XOR property: duplicates cancel out, leaving the unique element.",
  topic: "Bit Manipulation",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["XOR","array","bit manipulation"],
},

{
  dsaNumber: 52,
  title: "Number of 1 Bits",
  problem: "Write a function that takes an integer and returns the number of '1' bits in its binary representation.",
  solution: `function hammingWeight(n) {
    let count=0;
    while(n!==0){count+=n&1;n>>>=1;}
    return count;
  }`,
  approach: "Iteratively check each bit using bitwise AND.",
  topic: "Bit Manipulation",
  difficulty: "Easy",
  timeComplexity: "O(32)",
  spaceComplexity: "O(1)",
  tags: ["bit manipulation","count bits"],
},

{
  dsaNumber: 53,
  title: "Reverse Bits",
  problem: "Reverse bits of a given 32-bit unsigned integer.",
  solution: `function reverseBits(n) {
    let res=0;
    for(let i=0;i<32;i++){
      res=(res<<1)|(n&1);
      n>>>=1;
    }
    return res>>>0;
  }`,
  approach: "Shift result left and append last bit of n until all 32 bits processed.",
  topic: "Bit Manipulation",
  difficulty: "Easy",
  timeComplexity: "O(32)",
  spaceComplexity: "O(1)",
  tags: ["bit manipulation","reverse bits"],
},

{
  dsaNumber: 54,
  title: "Missing Number",
  problem: "Given array containing n distinct numbers from 0..n, find the missing number.",
  solution: `function missingNumber(nums){
    let res=0;
    for(let i=0;i<nums.length;i++) res^=i^nums[i];
    return res^nums.length;
  }`,
  approach: "XOR all indices and values; duplicates cancel leaving missing number.",
  topic: "Bit Manipulation",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["XOR","array","bit manipulation"],
},

{
  dsaNumber: 55,
  title: "Power of Two",
  problem: "Given an integer n, return true if it is a power of two.",
  solution: `function isPowerOfTwo(n){
    return n>0 && (n&(n-1))===0;
  }`,
  approach: "A power of two has only one bit set; check with n&(n-1).",
  topic: "Bit Manipulation",
  difficulty: "Easy",
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  tags: ["bit manipulation","math"],
},
// ── Arrays ────────────────────────────────────────────────
{
  dsaNumber: 56,
  title: "Rotate Array",
  problem: "Rotate array to the right by k steps.",
  solution: `function rotate(nums,k){
    k%=nums.length;
    nums.reverse();
    reverse(nums,0,k-1);
    reverse(nums,k,nums.length-1);
    function reverse(arr,l,r){
      while(l<r)[arr[l++],arr[r--]]=[arr[r],arr[l]];
    }
  }`,
  approach: "Reverse entire array, then reverse parts.",
  topic: "Arrays",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["array","rotation"],
},

{
  dsaNumber: 57,
  title: "Find Duplicate Number",
  problem: "Find the duplicate number in array of n+1 integers.",
  solution: `function findDuplicate(nums){
    let slow=nums[0],fast=nums[nums[0]];
    while(slow!==fast){slow=nums[slow];fast=nums[nums[fast]];}
    fast=0;
    while(slow!==fast){slow=nums[slow];fast=nums[fast];}
    return slow;
  }`,
  approach: "Floyd’s cycle detection.",
  topic: "Arrays",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["array","cycle detection"],
},

// ── Strings ───────────────────────────────────────────────
{
  dsaNumber: 58,
  title: "Valid Palindrome",
  problem: "Check if string is palindrome ignoring non-alphanumeric.",
  solution: `function isPalindrome(s){
    s=s.replace(/[^a-z0-9]/gi,"").toLowerCase();
    let l=0,r=s.length-1;
    while(l<r) if(s[l++]!==s[r--]) return false;
    return true;
  }`,
  approach: "Two-pointer check after cleaning string.",
  topic: "Strings",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["string","palindrome"],
},

{
  dsaNumber: 59,
  title: "Implement strStr()",
  problem: "Return index of first occurrence of needle in haystack.",
  solution: `function strStr(haystack,needle){
    return haystack.indexOf(needle);
  }`,
  approach: "Use built-in or implement substring search.",
  topic: "Strings",
  difficulty: "Easy",
  timeComplexity: "O(n·m)",
  spaceComplexity: "O(1)",
  tags: ["string","search"],
},

// ── Linked Lists ──────────────────────────────────────────
{
  dsaNumber: 60,
  title: "Palindrome Linked List",
  problem: "Check if linked list is palindrome.",
  solution: `function isPalindrome(head){
    let slow=head,fast=head;
    while(fast&&fast.next){slow=slow.next;fast=fast.next.next;}
    let prev=null;
    while(slow){const next=slow.next;slow.next=prev;prev=slow;slow=next;}
    while(prev){if(prev.val!==head.val)return false;prev=prev.next;head=head.next;}
    return true;
  }`,
  approach: "Find middle, reverse second half, compare.",
  topic: "Linked Lists",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["linked list","palindrome"],
},

{
  dsaNumber: 61,
  title: "Add Two Numbers",
  problem: "Add two numbers represented by linked lists.",
  solution: `function addTwoNumbers(l1,l2){
    const dummy={next:null};let curr=dummy,carry=0;
    while(l1||l2||carry){
      const sum=(l1?l1.val:0)+(l2?l2.val:0)+carry;
      carry=Math.floor(sum/10);
      curr.next={val:sum%10};curr=curr.next;
      l1=l1?l1.next:null;l2=l2?l2.next:null;
    }
    return dummy.next;
  }`,
  approach: "Simulate addition digit by digit.",
  topic: "Linked Lists",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["linked list","addition"],
},

// ── Stacks & Queues ───────────────────────────────────────
{
  dsaNumber: 62,
  title: "Daily Temperatures",
  problem: "Return days until warmer temperature.",
  solution: `function dailyTemperatures(T){
    const res=Array(T.length).fill(0),stack=[];
    for(let i=0;i<T.length;i++){
      while(stack.length&&T[i]>T[stack[stack.length-1]]){
        const idx=stack.pop();
        res[idx]=i-idx;
      }
      stack.push(i);
    }
    return res;
  }`,
  approach: "Monotonic stack.",
  topic: "Stacks & Queues",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["stack","monotonic"],
},

{
  dsaNumber: 63,
  title: "Sliding Window Maximum",
  problem: "Find max in each sliding window of size k.",
  solution: `function maxSlidingWindow(nums,k){
    const res=[],dq=[];
    for(let i=0;i<nums.length;i++){
      while(dq.length&&dq[0]<=i-k) dq.shift();
      while(dq.length&&nums[dq[dq.length-1]]<nums[i]) dq.pop();
      dq.push(i);
      if(i>=k-1) res.push(nums[dq[0]]);
    }
    return res;
  }`,
  approach: "Deque to maintain max.",
  topic: "Stacks & Queues",
  difficulty: "Hard",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["deque","sliding window"],
},

// ── Trees ─────────────────────────────────────────────────
{
  dsaNumber: 64,
  title: "Path Sum",
  problem: "Check if tree has root-to-leaf path sum equal to target.",
  solution: `function hasPathSum(root,sum){
    if(!root) return false;
    if(!root.left&&!root.right) return sum===root.val;
    return hasPathSum(root.left,sum-root.val)||hasPathSum(root.right,sum-root.val);
  }`,
  approach: "DFS subtracting node values.",
  topic: "Trees",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  tags: ["tree","DFS"],
},

{
  dsaNumber: 65,
  title: "Construct Binary Tree from Preorder and Inorder",
  problem: "Build tree from preorder and inorder traversal arrays.",
  solution: `function buildTree(pre,inorder){
    if(!pre.length) return null;
    const root={val:pre[0]};
    const idx=inorder.indexOf(pre[0]);
    root.left=buildTree(pre.slice(1,idx+1),inorder.slice(0,idx));
    root.right=buildTree(pre.slice(idx+1),inorder.slice(idx+1));
    return root;
  }`,
  approach: "Recursively split arrays by root index.",
  topic: "Trees",
  difficulty: "Medium",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(n)",
  tags: ["tree","construction"],
},

// ── Graphs ───────────────────────────────────────────────
{
  dsaNumber: 66,
  title: "Graph Valid Tree",
  problem: "Check if edges form a valid tree.",
  solution: `function validTree(n,edges){
    if(edges.length!==n-1) return false;
    const parent=Array(n).fill(0).map((_,i)=>i);
    const find=x=>parent[x]===x?x:find(parent[x]);
    for(const [u,v] of edges){
      const pu=find(u),pv=find(v);
      if(pu===pv) return false;
      parent[pu]=pv;
    }
    return true;
  }`,
  approach: "Union-Find to detect cycles.",
  topic: "Graphs",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["graph","union-find"],
},
// ── Graphs ───────────────────────────────────────────────
{
  dsaNumber: 67,
  title: "Minimum Spanning Tree (Prim’s)",
  problem: "Find MST of weighted graph using Prim’s algorithm.",
  solution: `function primMST(graph){
    const n=graph.length;
    const visited=Array(n).fill(false);
    const dist=Array(n).fill(Infinity);
    dist[0]=0;
    let cost=0;
    for(let i=0;i<n;i++){
      let u=-1;
      for(let v=0;v<n;v++)
        if(!visited[v]&&(u===-1||dist[v]<dist[u])) u=v;
      visited[u]=true;
      cost+=dist[u];
      for(const [v,w] of graph[u])
        if(!visited[v]&&w<dist[v]) dist[v]=w;
    }
    return cost;
  }`,
  approach: "Greedy selection of minimum edge using Prim’s algorithm.",
  topic: "Graphs",
  difficulty: "Hard",
  timeComplexity: "O(V²)",
  spaceComplexity: "O(V)",
  tags: ["graph","MST","Prim"],
},

// ── Bit Manipulation ─────────────────────────────────────
{
  dsaNumber: 68,
  title: "Subset XOR Sum",
  problem: "Return sum of XOR of all subsets of array.",
  solution: `function subsetXORSum(nums){
    let res=0;
    const dfs=(i,xor)=>{
      if(i===nums.length){res+=xor;return;}
      dfs(i+1,xor^nums[i]);
      dfs(i+1,xor);
    };
    dfs(0,0);
    return res;
  }`,
  approach: "DFS to generate subsets and compute XOR.",
  topic: "Bit Manipulation",
  difficulty: "Medium",
  timeComplexity: "O(2^n)",
  spaceComplexity: "O(n)",
  tags: ["bit manipulation","subset","XOR"],
},

{
  dsaNumber: 69,
  title: "Maximum XOR of Two Numbers",
  problem: "Find maximum XOR of any two numbers in array.",
  solution: `function findMaximumXOR(nums){
    let max=0,mask=0;
    for(let i=31;i>=0;i--){
      mask|=(1<<i);
      const set=new Set(nums.map(n=>n&mask));
      let candidate=max|(1<<i);
      for(const prefix of set)
        if(set.has(prefix^candidate)){max=candidate;break;}
    }
    return max;
  }`,
  approach: "Greedy bitwise trie-like approach.",
  topic: "Bit Manipulation",
  difficulty: "Hard",
  timeComplexity: "O(n·logM)",
  spaceComplexity: "O(n)",
  tags: ["bit manipulation","XOR"],
},

// ── Math ─────────────────────────────────────────────────
{
  dsaNumber: 70,
  title: "Integer to Roman",
  problem: "Convert integer to Roman numeral.",
  solution: `function intToRoman(num){
    const vals=[1000,900,500,400,100,90,50,40,10,9,5,4,1];
    const syms=["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];
    let res="";
    for(let i=0;i<vals.length;i++)
      while(num>=vals[i]){res+=syms[i];num-=vals[i];}
    return res;
  }`,
  approach: "Greedy subtraction using Roman numeral values.",
  topic: "Math",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(1)",
  tags: ["math","roman numerals"],
},

{
  dsaNumber: 71,
  title: "Roman to Integer",
  problem: "Convert Roman numeral to integer.",
  solution: `function romanToInt(s){
    const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000};
    let res=0;
    for(let i=0;i<s.length;i++){
      if(i<s.length-1&&map[s[i]]<map[s[i+1]]) res-=map[s[i]];
      else res+=map[s[i]];
    }
    return res;
  }`,
  approach: "Check subtraction cases by comparing adjacent symbols.",
  topic: "Math",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["math","roman numerals"],
},

// ── Matrix ───────────────────────────────────────────────
{
  dsaNumber: 72,
  title: "Set Matrix Zeroes",
  problem: "If element is 0, set entire row and column to 0.",
  solution: `function setZeroes(matrix){
    const rows=new Set(),cols=new Set();
    for(let i=0;i<matrix.length;i++)
      for(let j=0;j<matrix[0].length;j++)
        if(matrix[i][j]===0){rows.add(i);cols.add(j);}
    for(const r of rows) for(let j=0;j<matrix[0].length;j++) matrix[r][j]=0;
    for(const c of cols) for(let i=0;i<matrix.length;i++) matrix[i][c]=0;
  }`,
  approach: "Track rows and columns with zero, then update.",
  topic: "Matrix",
  difficulty: "Medium",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m+n)",
  tags: ["matrix","array"],
},

{
  dsaNumber: 73,
  title: "Game of Life",
  problem: "Implement Conway’s Game of Life rules.",
  solution: `function gameOfLife(board){
    const dirs=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    const copy=board.map(r=>[...r]);
    for(let i=0;i<board.length;i++)
      for(let j=0;j<board[0].length;j++){
        let live=0;
        for(const [dx,dy] of dirs){
          const x=i+dx,y=j+dy;
          if(x>=0&&y>=0&&x<board.length&&y<board[0].length&&copy[x][y]===1) live++;
        }
        if(copy[i][j]===1&&(live<2||live>3)) board[i][j]=0;
        if(copy[i][j]===0&&live===3) board[i][j]=1;
      }
  }`,
  approach: "Simulate rules with copy of board.",
  topic: "Matrix",
  difficulty: "Medium",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",
  tags: ["matrix","simulation"],
},

// ── Design ───────────────────────────────────────────────
{
  dsaNumber: 74,
  title: "LRU Cache",
  problem: "Design LRU cache with get and put in O(1).",
  solution: `class LRUCache{
    constructor(cap){this.cap=cap;this.map=new Map();}
    get(key){
      if(!this.map.has(key)) return -1;
      const val=this.map.get(key);
      this.map.delete(key);this.map.set(key,val);
      return val;
    }
    put(key,val){
      if(this.map.has(key)) this.map.delete(key);
      else if(this.map.size===this.cap) this.map.delete(this.map.keys().next().value);
      this.map.set(key,val);
    }
  }`,
  approach: "Use Map with insertion order to simulate LRU.",
  topic: "Design",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(capacity)",
  tags: ["design","cache","LRU"],
},

{
  dsaNumber: 75,
  title: "Implement Trie",
  problem: "Implement Trie with insert, search, startsWith.",
  solution: `class Trie{
    constructor(){this.root={};}
    insert(word){
      let node=this.root;
      for(const c of word){if(!node[c]) node[c]={};node=node[c];}
      node.end=true;
    }
    search(word){
      let node=this.root;
      for(const c of word){if(!node[c]) return false;node=node[c];}
      return !!node.end;
    }
    startsWith(prefix){
      let node=this.root;
      for(const c of prefix){if(!node[c]) return false;node=node[c];}
      return true;
    }
  }`,
  approach: "Nested objects to represent trie nodes.",
  topic: "Design",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["trie","prefix tree"],
},

// ── Advanced Graphs ──────────────────────────────────────
// ── Advanced Graphs ──────────────────────────────────────
{
  dsaNumber: 76,
  title: "Bellman-Ford Algorithm",
  problem: "Compute shortest paths from source to all vertices in weighted graph (may contain negative edges).",
  solution: `function bellmanFord(n,edges,src){
    const dist=Array(n).fill(Infinity);
    dist[src]=0;
    for(let i=0;i<n-1;i++){
      for(const [u,v,w] of edges){
        if(dist[u]+w<dist[v]) dist[v]=dist[u]+w;
      }
    }
    return dist;
  }`,
  approach: "Relax all edges n-1 times; works with negative weights.",
  topic: "Graphs",
  difficulty: "Medium",
  timeComplexity: "O(V·E)",
  spaceComplexity: "O(V)",
  tags: ["graph","shortest path","Bellman-Ford"],
},

{
  dsaNumber: 77,
  title: "Floyd-Warshall Algorithm",
  problem: "Find shortest paths between all pairs of vertices.",
  solution: `function floydWarshall(matrix){
    const n=matrix.length;
    for(let k=0;k<n;k++)
      for(let i=0;i<n;i++)
        for(let j=0;j<n;j++)
          if(matrix[i][k]+matrix[k][j]<matrix[i][j])
            matrix[i][j]=matrix[i][k]+matrix[k][j];
    return matrix;
  }`,
  approach: "Dynamic programming over intermediate vertices.",
  topic: "Graphs",
  difficulty: "Hard",
  timeComplexity: "O(V³)",
  spaceComplexity: "O(V²)",
  tags: ["graph","shortest path","Floyd-Warshall"],
},

// ── Matrix ───────────────────────────────────────────────
{
  dsaNumber: 78,
  title: "Search a 2D Matrix",
  problem: "Search target in matrix with sorted rows and columns.",
  solution: `function searchMatrix(matrix,target){
    let r=0,c=matrix[0].length-1;
    while(r<matrix.length&&c>=0){
      if(matrix[r][c]===target) return true;
      if(matrix[r][c]>target) c--; else r++;
    }
    return false;
  }`,
  approach: "Start from top-right; eliminate row or column each step.",
  topic: "Matrix",
  difficulty: "Medium",
  timeComplexity: "O(m+n)",
  spaceComplexity: "O(1)",
  tags: ["matrix","search"],
},

{
  dsaNumber: 79,
  title: "Maximal Rectangle",
  problem: "Find largest rectangle containing only 1s in binary matrix.",
  solution: `function maximalRectangle(matrix){
    if(!matrix.length) return 0;
    const n=matrix[0].length;
    const heights=Array(n).fill(0);
    let max=0;
    for(const row of matrix){
      for(let i=0;i<n;i++) heights[i]=row[i]==="1"?heights[i]+1:0;
      max=Math.max(max,largestRectangleArea(heights));
    }
    return max;
  }
  function largestRectangleArea(h){
    const stack=[],res=0;
    for(let i=0;i<=h.length;i++){
      const curr=i===h.length?0:h[i];
      while(stack.length&&curr<h[stack[stack.length-1]]){
        const height=h[stack.pop()];
        const width=stack.length?i-stack[stack.length-1]-1:i;
        res=Math.max(res,height*width);
      }
      stack.push(i);
    }
    return res;
  }`,
  approach: "Use histogram technique row by row.",
  topic: "Matrix",
  difficulty: "Hard",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(n)",
  tags: ["matrix","stack","rectangle"],
},

// ── Bit Manipulation ─────────────────────────────────────
{
  dsaNumber: 80,
  title: "Counting Bits",
  problem: "Given integer n, return array of number of 1s in binary representation for 0..n.",
  solution: `function countBits(n){
    const res=[0];
    for(let i=1;i<=n;i++) res[i]=res[i>>1]+(i&1);
    return res;
  }`,
  approach: "DP relation: bits(i)=bits(i>>1)+(i&1).",
  topic: "Bit Manipulation",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["bit manipulation","DP"],
},
// ── Arrays ────────────────────────────────────────────────
{
  dsaNumber: 81,
  title: "Majority Element",
  problem: "Find the element that appears more than ⌊n/2⌋ times in the array.",
  solution: `function majorityElement(nums){
    let count=0,candidate=null;
    for(const n of nums){
      if(count===0) candidate=n;
      count+=(n===candidate?1:-1);
    }
    return candidate;
  }`,
  approach: "Boyer-Moore Voting Algorithm.",
  topic: "Arrays",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["array","majority","Boyer-Moore"],
},

// ── Strings ───────────────────────────────────────────────
{
  dsaNumber: 82,
  title: "Longest Common Prefix",
  problem: "Find longest common prefix among array of strings.",
  solution: `function longestCommonPrefix(strs){
    if(!strs.length) return "";
    let prefix=strs[0];
    for(let i=1;i<strs.length;i++){
      while(strs[i].indexOf(prefix)!==0){
        prefix=prefix.slice(0,prefix.length-1);
        if(!prefix) return "";
      }
    }
    return prefix;
  }`,
  approach: "Iteratively shrink prefix until all strings match.",
  topic: "Strings",
  difficulty: "Easy",
  timeComplexity: "O(n·m)",
  spaceComplexity: "O(1)",
  tags: ["string","prefix"],
},

// ── Bit Manipulation ─────────────────────────────────────
{
  dsaNumber: 83,
  title: "Gray Code",
  problem: "Generate n-bit Gray code sequence.",
  solution: `function grayCode(n){
    const res=[0];
    for(let i=0;i<n;i++){
      const add=1<<i;
      for(let j=res.length-1;j>=0;j--) res.push(res[j]+add);
    }
    return res;
  }`,
  approach: "Reflect and prefix method.",
  topic: "Bit Manipulation",
  difficulty: "Medium",
  timeComplexity: "O(2^n)",
  spaceComplexity: "O(2^n)",
  tags: ["bit manipulation","gray code"],
},

// ── Matrix ───────────────────────────────────────────────
{
  dsaNumber: 84,
  title: "Rotate Image Counterclockwise",
  problem: "Rotate n×n matrix by 90 degrees counterclockwise.",
  solution: `function rotateCounter(matrix){
    const n=matrix.length;
    for(let i=0;i<n;i++)
      for(let j=i;j<n;j++)
        [matrix[i][j],matrix[j][i]]=[matrix[j][i],matrix[i][j]];
    matrix.reverse();
  }`,
  approach: "Transpose then reverse rows.",
  topic: "Matrix",
  difficulty: "Medium",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(1)",
  tags: ["matrix","rotation"],
},

// ── Design ───────────────────────────────────────────────
{
  dsaNumber: 85,
  title: "Design HashMap",
  problem: "Implement HashMap with put, get, remove.",
  solution: `class MyHashMap{
    constructor(){this.map={};}
    put(key,value){this.map[key]=value;}
    get(key){return this.map.hasOwnProperty(key)?this.map[key]:-1;}
    remove(key){delete this.map[key];}
  }`,
  approach: "Use object as key-value store.",
  topic: "Design",
  difficulty: "Easy",
  timeComplexity: "O(1)",
  spaceComplexity: "O(n)",
  tags: ["design","hash map"],
},
// ── Arrays ────────────────────────────────────────────────
{
  dsaNumber: 86,
  title: "Maximum Product Subarray",
  problem: "Find contiguous subarray with maximum product.",
  solution: `function maxProduct(nums){
    let max=nums[0],min=nums[0],res=nums[0];
    for(let i=1;i<nums.length;i++){
      if(nums[i]<0)[max,min]=[min,max];
      max=Math.max(nums[i],max*nums[i]);
      min=Math.min(nums[i],min*nums[i]);
      res=Math.max(res,max);
    }
    return res;
  }`,
  approach: "Track both max and min products due to negatives.",
  topic: "Arrays",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["array","dynamic programming"],
},

// ── Strings ───────────────────────────────────────────────
{
  dsaNumber: 87,
  title: "Minimum Edit Distance (Levenshtein)",
  problem: "Find minimum operations to convert one string to another.",
  solution: `function minDistance(a,b){
    const m=a.length,n=b.length;
    const dp=Array.from({length:m+1},()=>Array(n+1).fill(0));
    for(let i=0;i<=m;i++) dp[i][0]=i;
    for(let j=0;j<=n;j++) dp[0][j]=j;
    for(let i=1;i<=m;i++)
      for(let j=1;j<=n;j++)
        dp[i][j]=a[i-1]===b[j-1]?dp[i-1][j-1]:
          1+Math.min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]);
    return dp[m][n];
  }`,
  approach: "Dynamic programming table for edit distance.",
  topic: "Strings",
  difficulty: "Hard",
  timeComplexity: "O(m·n)",
  spaceComplexity: "O(m·n)",
  tags: ["string","DP","edit distance"],
},

// ── Linked Lists ──────────────────────────────────────────
{
  dsaNumber: 88,
  title: "Flatten Multilevel Doubly Linked List",
  problem: "Flatten a multilevel doubly linked list.",
  solution: `function flatten(head){
    let curr=head;
    while(curr){
      if(curr.child){
        let next=curr.next;
        let child=flatten(curr.child);
        curr.next=child;child.prev=curr;curr.child=null;
        while(curr.next) curr=curr.next;
        if(next){curr.next=next;next.prev=curr;}
      }
      curr=curr.next;
    }
    return head;
  }`,
  approach: "DFS flatten child lists inline.",
  topic: "Linked Lists",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["linked list","DFS"],
},

// ── Stacks & Queues ───────────────────────────────────────
{
  dsaNumber: 89,
  title: "Largest Rectangle in Histogram",
  problem: "Find largest rectangle in histogram.",
  solution: `function largestRectangleArea(h){
    const stack=[],res=0;
    for(let i=0;i<=h.length;i++){
      const curr=i===h.length?0:h[i];
      while(stack.length&&curr<h[stack[stack.length-1]]){
        const height=h[stack.pop()];
        const width=stack.length?i-stack[stack.length-1]-1:i;
        res=Math.max(res,height*width);
      }
      stack.push(i);
    }
    return res;
  }`,
  approach: "Monotonic stack to compute max area.",
  topic: "Stacks & Queues",
  difficulty: "Hard",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["stack","histogram"],
},

// ── Trees ─────────────────────────────────────────────────
{
  dsaNumber: 90,
  title: "Diameter of Binary Tree",
  problem: "Find length of longest path between any two nodes.",
  solution: `function diameterOfBinaryTree(root){
    let max=0;
    function depth(node){
      if(!node) return 0;
      const l=depth(node.left),r=depth(node.right);
      max=Math.max(max,l+r);
      return 1+Math.max(l,r);
    }
    depth(root);
    return max;
  }`,
  approach: "DFS computing depth and updating diameter.",
  topic: "Trees",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  tags: ["tree","DFS","diameter"],
},

// ── Graphs ───────────────────────────────────────────────
{
  dsaNumber: 91,
  title: "Detect Bipartite Graph",
  problem: "Check if graph is bipartite.",
  solution: `function isBipartite(graph){
    const color=Array(graph.length).fill(0);
    const dfs=(node,c)=>{
      if(color[node]) return color[node]===c;
      color[node]=c;
      for(const nei of graph[node])
        if(!dfs(nei,-c)) return false;
      return true;
    };
    for(let i=0;i<graph.length;i++)
      if(!color[i]&&!dfs(i,1)) return false;
    return true;
  }`,
  approach: "DFS coloring with two colors.",
  topic: "Graphs",
  difficulty: "Medium",
  timeComplexity: "O(V+E)",
  spaceComplexity: "O(V)",
  tags: ["graph","DFS","bipartite"],
},

// ── Dynamic Programming ──────────────────────────────────
{
  dsaNumber: 92,
  title: "House Robber",
  problem: "Max money without robbing adjacent houses.",
  solution: `function rob(nums){
    let prev=0,curr=0;
    for(const n of nums)[prev,curr]=[curr,Math.max(curr,prev+n)];
    return curr;
  }`,
  approach: "DP with rolling variables.",
  topic: "Dynamic Programming",
  difficulty: "Easy",
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)",
  tags: ["DP","array"],
},

{
  dsaNumber: 93,
  title: "Word Break",
  problem: "Check if string can be segmented into dictionary words.",
  solution: `function wordBreak(s,dict){
    const set=new Set(dict);
    const dp=Array(s.length+1).fill(false);
    dp[0]=true;
    for(let i=1;i<=s.length;i++)
      for(let j=0;j<i;j++)
        if(dp[j]&&set.has(s.slice(j,i))){dp[i]=true;break;}
    return dp[s.length];
  }`,
  approach: "DP checking substrings.",
  topic: "Dynamic Programming",
  difficulty: "Medium",
  timeComplexity: "O(n²)",
  spaceComplexity: "O(n)",
  tags: ["DP","string"],
},

// ── Sorting & Searching ──────────────────────────────────
{
  dsaNumber: 94,
  title: "Kth Smallest Element in BST",
  problem: "Find kth smallest element in BST.",
  solution: `function kthSmallest(root,k){
    const stack=[];
    while(true){
      while(root){stack.push(root);root=root.left;}
      root=stack.pop();
      if(--k===0) return root.val;
      root=root.right;
    }
  }`,
  approach: "Inorder traversal with stack.",
  topic: "Sorting & Searching",
  difficulty: "Medium",
  timeComplexity: "O(n)",
  spaceComplexity: "O(h)",
  tags: ["BST","inorder"],
},

{
  dsaNumber: 95,
  title: "Search Insert Position",
  problem: "Return index if target found, else insert position.",
  solution: `function searchInsert(nums,target){
    let l=0,r=nums.length-1;
    while(l<=r){
      const mid=Math.floor((l+r)/2);
      if(nums[mid]===target) return mid;
      if(nums[mid]<target) l=mid+1; else r=mid-1;
    }
    return l;
  }`,
  approach: "Binary search for insertion point.",
  topic: "Sorting & Searching",
  difficulty: "Easy",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)",
  tags: ["binary search","array"],
},
// ── Recursion ────────────────────────────────────────────
{
  dsaNumber: 96,
  title: "N-Queens",
  problem: "Return all distinct solutions to the n-queens puzzle.",
  solution: `function solveNQueens(n){
    const res=[],board=Array(n).fill().map(()=>Array(n).fill("."));
    const cols=new Set(),diag1=new Set(),diag2=new Set();
    function backtrack(r){
      if(r===n){res.push(board.map(row=>row.join("")));return;}
      for(let c=0;c<n;c++){
        if(cols.has(c)||diag1.has(r-c)||diag2.has(r+c)) continue;
        board[r][c]="Q";cols.add(c);diag1.add(r-c);diag2.add(r+c);
        backtrack(r+1);
        board[r][c]=".";cols.delete(c);diag1.delete(r-c);diag2.delete(r+c);
      }
    }
    backtrack(0);
    return res;
  }`,
  approach: "Backtracking with sets to track column and diagonal conflicts.",
  topic: "Recursion",
  difficulty: "Hard",
  timeComplexity: "O(n!)",
  spaceComplexity: "O(n²)",
  tags: ["recursion","backtracking","n-queens"],
},

// ── Backtracking ─────────────────────────────────────────
{
  dsaNumber: 97,
  title: "Word Search",
  problem: "Given a board and a word, check if the word exists in the grid.",
  solution: `function exist(board,word){
    const m=board.length,n=board[0].length;
    const dfs=(i,j,k)=>{
      if(k===word.length) return true;
      if(i<0||j<0||i>=m||j>=n||board[i][j]!==word[k]) return false;
      const tmp=board[i][j];board[i][j]="#";
      const found=dfs(i+1,j,k+1)||dfs(i-1,j,k+1)||dfs(i,j+1,k+1)||dfs(i,j-1,k+1);
      board[i][j]=tmp;
      return found;
    };
    for(let i=0;i<m;i++)for(let j=0;j<n;j++)
      if(dfs(i,j,0)) return true;
    return false;
  }`,
  approach: "Backtracking DFS with visited marking.",
  topic: "Backtracking",
  difficulty: "Medium",
  timeComplexity: "O(m·n·4^L)",
  spaceComplexity: "O(L)",
  tags: ["backtracking","DFS","matrix"],
},

// ── Greedy ───────────────────────────────────────────────
{
  dsaNumber: 98,
  title: "Candy",
  problem: "Distribute candies to children based on ratings with minimum candies.",
  solution: `function candy(ratings){
    const n=ratings.length;
    const candies=Array(n).fill(1);
    for(let i=1;i<n;i++) if(ratings[i]>ratings[i-1]) candies[i]=candies[i-1]+1;
    for(let i=n-2;i>=0;i--) if(ratings[i]>ratings[i+1]) candies[i]=Math.max(candies[i],candies[i+1]+1);
    return candies.reduce((a,b)=>a+b,0);
  }`,
  approach: "Two passes: left-to-right and right-to-left.",
  topic: "Greedy",
  difficulty: "Hard",
  timeComplexity: "O(n)",
  spaceComplexity: "O(n)",
  tags: ["greedy","array","distribution"],
},

// ── Math ─────────────────────────────────────────────────
{
  dsaNumber: 99,
  title: "Happy Number",
  problem: "Determine if a number is happy (sum of squares of digits eventually equals 1).",
  solution: `function isHappy(n){
    const seen=new Set();
    const next=x=>x.toString().split("").reduce((a,b)=>a+b*b,0);
    while(n!==1&&!seen.has(n)){seen.add(n);n=next(n);}
    return n===1;
  }`,
  approach: "Iteratively compute sum of squares of digits; detect cycles with set.",
  topic: "Math",
  difficulty: "Easy",
  timeComplexity: "O(log n)",
  spaceComplexity: "O(log n)",
  tags: ["math","cycle detection"],
},

// ── Design ───────────────────────────────────────────────
{
  dsaNumber: 100,
  title: "Design MinStack with O(1) getMin",
  problem: "Implement stack supporting push, pop, top, and getMin in O(1).",
  solution: `class MinStack{
    constructor(){this.stack=[];this.min=[];}
    push(x){this.stack.push(x);this.min.push(this.min.length?Math.min(x,this.min[this.min.length-1]):x);}
    pop(){this.stack.pop();this.min.pop();}
    top(){return this.stack[this.stack.length-1];}
    getMin(){return this.min[this.min.length-1];}
  }`,
  approach: "Maintain auxiliary stack for minimums.",
  topic: "Design",
  difficulty: "Medium",
  timeComplexity: "O(1)",
  spaceComplexity: "O(n)",
  tags: ["design","stack","min stack"],
},

];


module.exports = dsaQuestions;
