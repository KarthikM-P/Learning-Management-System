import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DashboardShell } from "@/components/dashboard-shell"
import { BookOpen, MessageSquare, ThumbsUp } from "lucide-react"

export default function BlogPostPage() {
  return (
    <DashboardShell>
      <article className="container mx-auto py-6 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Understanding JavaScript Closures</h1>

          <div className="flex items-center gap-4 mb-6">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">Jane Smith</div>
              <div className="text-sm text-muted-foreground">Senior JavaScript Developer • March 15, 2025</div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              JavaScript
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          </div>

          <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted mb-8">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="JavaScript Closures"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="prose max-w-none">
            <p>
              One of the most powerful features of JavaScript is closures. They can be tricky to understand at first,
              but they're incredibly useful once you get the hang of them.
            </p>

            <h2>What Are Closures?</h2>

            <p>
              In simple terms, a closure is a function that remembers its outer variables and can access them. In
              JavaScript, closures are created every time a function is created, at function creation time.
            </p>

            <p>Let's look at a basic example:</p>

            <pre className="bg-muted p-4 rounded-md overflow-auto">
              <code className="language-javascript">
                {`function createCounter() {
  let count = 0;
  
  return function() {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3`}
              </code>
            </pre>

            <p>
              In this example, the <code>createCounter</code> function returns another function. The returned function
              maintains access to the <code>count</code> variable, even after <code>createCounter</code> has finished
              executing. This is a closure in action.
            </p>

            <h2>Why Are Closures Useful?</h2>

            <p>Closures are useful for several reasons:</p>

            <ul>
              <li>They enable data encapsulation and private variables</li>
              <li>They can be used to create factory functions</li>
              <li>They're at the core of many JavaScript patterns, including the module pattern</li>
              <li>They allow for the creation of stateful functions</li>
            </ul>

            <h2>Advanced Example: Memoization</h2>

            <p>
              One practical use of closures is memoization—a technique used to speed up programs by caching the results
              of expensive function calls.
            </p>

            <pre className="bg-muted p-4 rounded-md overflow-auto">
              <code className="language-javascript">
                {`function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache[key]) {
      console.log('Fetching from cache');
      return cache[key];
    }
    
    console.log('Calculating result');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalculation = (n) => {
  console.log('Performing expensive calculation');
  return n * n;
};

const memoizedCalculation = memoize(expensiveCalculation);

console.log(memoizedCalculation(5)); // Calculating result, 25
console.log(memoizedCalculation(5)); // Fetching from cache, 25`}
              </code>
            </pre>

            <p>
              In this example, we're using a closure to create a cache that persists between function calls. The{" "}
              <code>memoize</code> function returns a new function that checks if the result for a given set of
              arguments is already in the cache before performing the calculation.
            </p>

            <h2>Common Pitfalls</h2>

            <p>While closures are powerful, they can also lead to some common issues:</p>

            <h3>Memory Leaks</h3>

            <p>
              Since closures maintain references to their outer variables, they can prevent those variables from being
              garbage collected, potentially causing memory leaks in your application.
            </p>

            <h3>Loop Closures</h3>

            <p>A classic issue is creating closures in loops. Consider the following example:</p>

            <pre className="bg-muted p-4 rounded-md overflow-auto">
              <code className="language-javascript">
                {`for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// Outputs: 3, 3, 3`}
              </code>
            </pre>

            <p>
              This happens because the closure captures the variable <code>i</code>, not its value at the time the
              closure was created. By the time the setTimeout callbacks execute, the loop has completed and{" "}
              <code>i</code> is 3.
            </p>

            <p>
              The fix is to use <code>let</code> instead of <code>var</code>, which creates a new binding for each loop
              iteration:
            </p>

            <pre className="bg-muted p-4 rounded-md overflow-auto">
              <code className="language-javascript">
                {`for (let i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// Outputs: 0, 1, 2`}
              </code>
            </pre>

            <h2>Conclusion</h2>

            <p>
              Closures are a fundamental concept in JavaScript that every developer should understand. They might seem
              complex at first, but they provide powerful capabilities for writing clean, maintainable, and efficient
              code.
            </p>

            <p>Practice working with closures, and they'll become a valuable tool in your JavaScript toolkit.</p>
          </div>
        </div>

        <Separator className="my-8" />

        <div>
          <h3 className="text-xl font-bold mb-4">Discussion (12)</h3>

          <div className="space-y-6">
            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">John Doe</span>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <p className="mt-1">
                  This is a great explanation of closures! I've been struggling to understand them for a while, but your
                  examples really helped clear things up. The memoization example is particularly useful—I can see how
                  that would be beneficial in real-world applications.
                </p>
                <div className="flex gap-4 mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>8</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pl-12">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">Jane Smith</span>
                  <span className="text-xs text-muted-foreground">1 day ago</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Author
                  </span>
                </div>
                <p className="mt-1">
                  Thanks, John! I'm glad you found it helpful. Memoization is definitely one of my favorite practical
                  applications of closures. If you have any other questions, feel free to ask!
                </p>
                <div className="flex gap-4 mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>4</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">Alex Johnson</span>
                  <span className="text-xs text-muted-foreground">12 hours ago</span>
                </div>
                <p className="mt-1">
                  I've been using closures for years without fully understanding how they work. Your explanation of the
                  loop closures pitfall was especially eye-opening. I've definitely run into that issue before!
                </p>
                <div className="flex gap-4 mt-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    <span>2</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    <span>Reply</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="mt-6">
            <h4 className="font-medium mb-2">Add a comment</h4>
            <textarea
              className="w-full min-h-[120px] p-4 rounded-md border mb-4"
              placeholder="Share your thoughts..."
            ></textarea>
            <Button>Post Comment</Button>
          </div>
        </div>
      </article>
    </DashboardShell>
  )
}

