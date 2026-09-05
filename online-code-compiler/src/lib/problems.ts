export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  inputArgs: any[];
  expected: any;
  isHidden?: boolean;
}

export interface Problem {
  id: string;
  slug: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: 'Arrays & Hashing' | 'Two Pointers' | 'Sliding Window' | 'Binary Search' | 'SQL Querying';
  acceptance: string;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    javascript: string;
    typescript: string;
    python: string;
    sql: string;
  };
  functionName: string;
  testCases: TestCase[];
}

export const PROBLEMS: Problem[] = [
  {
    id: 'prob-1',
    slug: 'two-sum',
    title: '1. Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    acceptance: '53.2%',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]'
      }
    ],
    functionName: 'twoSum',
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def twoSum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
      sql: `-- SQL Alternative: Retrieve pair combinations where total amount equals 900
SELECT a.id AS id1, b.id AS id2, (a.amount + b.amount) AS total
FROM transactions a
JOIN transactions b ON a.id < b.id
WHERE (a.amount + b.amount) = 900;`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'nums = [2, 7, 11, 15], target = 9',
        expectedOutput: '[0, 1]',
        inputArgs: [[2, 7, 11, 15], 9],
        expected: [0, 1]
      },
      {
        id: 'tc-2',
        input: 'nums = [3, 2, 4], target = 6',
        expectedOutput: '[1, 2]',
        inputArgs: [[3, 2, 4], 6],
        expected: [1, 2]
      },
      {
        id: 'tc-3',
        input: 'nums = [3, 3], target = 6',
        expectedOutput: '[0, 1]',
        inputArgs: [[3, 3], 6],
        expected: [0, 1]
      }
    ]
  },
  {
    id: 'prob-2',
    slug: 'valid-palindrome',
    title: '125. Valid Palindrome',
    difficulty: 'Easy',
    category: 'Two Pointers',
    acceptance: '47.8%',
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    examples: [
      {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      },
      {
        input: 's = "race a car"',
        output: 'false',
        explanation: '"raceacar" is not a palindrome.'
      }
    ],
    functionName: 'isPalindrome',
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      typescript: `function isPalindrome(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
      python: `def isPalindrome(s):
    clean = ''.join(c.lower() for c in s if c.isalnum())
    return clean == clean[::-1]`,
      sql: `-- SQL check for palindromic merchant codes
SELECT id, code, (code = REVERSE(code)) AS is_palindrome
FROM merchants
WHERE LENGTH(code) > 2;`
    },
    testCases: [
      {
        id: 'tc-2-1',
        input: 's = "A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
        inputArgs: ['A man, a plan, a canal: Panama'],
        expected: true
      },
      {
        id: 'tc-2-2',
        input: 's = "race a car"',
        expectedOutput: 'false',
        inputArgs: ['race a car'],
        expected: false
      },
      {
        id: 'tc-2-3',
        input: 's = " "',
        expectedOutput: 'true',
        inputArgs: [' '],
        expected: true
      }
    ]
  },
  {
    id: 'prob-3',
    slug: 'binary-search',
    title: '704. Binary Search',
    difficulty: 'Easy',
    category: 'Binary Search',
    acceptance: '58.1%',
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    constraints: [
      '1 <= nums.length <= 10^4',
      '-10^4 < nums[i], target < 10^4',
      'All the integers in nums are unique.',
      'nums is sorted in ascending order.'
    ],
    examples: [
      {
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        output: '4',
        explanation: '9 exists in nums and its index is 4'
      },
      {
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        output: '-1',
        explanation: '2 does not exist in nums so return -1'
      }
    ],
    functionName: 'search',
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      typescript: `function search(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      python: `def search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
      sql: `-- SQL Binary Lookup Index Simulation
SELECT id, transaction_ref, amount
FROM transactions
WHERE amount = 900
LIMIT 1;`
    },
    testCases: [
      {
        id: 'tc-3-1',
        input: 'nums = [-1,0,3,5,9,12], target = 9',
        expectedOutput: '4',
        inputArgs: [[-1, 0, 3, 5, 9, 12], 9],
        expected: 4
      },
      {
        id: 'tc-3-2',
        input: 'nums = [-1,0,3,5,9,12], target = 2',
        expectedOutput: '-1',
        inputArgs: [[-1, 0, 3, 5, 9, 12], 2],
        expected: -1
      }
    ]
  },
  {
    id: 'prob-4',
    slug: 'max-subarray',
    title: '53. Maximum Subarray (Kadane)',
    difficulty: 'Medium',
    category: 'Arrays & Hashing',
    acceptance: '51.4%',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    examples: [
      {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: 'nums = [1]',
        output: '1'
      },
      {
        input: 'nums = [5,4,-1,7,8]',
        output: '23'
      }
    ],
    functionName: 'maxSubArray',
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }
  return maxSoFar;
}`,
      typescript: `function maxSubArray(nums: number[]): number {
  let maxSoFar = nums[0];
  let currMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currMax = Math.max(nums[i], currMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currMax);
  }
  return maxSoFar;
}`,
      python: `def maxSubArray(nums):
    max_so_far = curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far`,
      sql: `-- SQL Window Cumulative Peak
SELECT user_id, SUM(amount) OVER (ORDER BY created_at) AS running_balance
FROM transactions
ORDER BY running_balance DESC
LIMIT 1;`
    },
    testCases: [
      {
        id: 'tc-4-1',
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
        inputArgs: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expected: 6
      },
      {
        id: 'tc-4-2',
        input: 'nums = [5,4,-1,7,8]',
        expectedOutput: '23',
        inputArgs: [[5, 4, -1, 7, 8]],
        expected: 23
      }
    ]
  }
];
