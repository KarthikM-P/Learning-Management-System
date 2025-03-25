

export default function LMSPreview() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Landing Page */}
      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Learning Management System</h1>
            <p className="text-xl text-muted-foreground">
              A complete platform for interactive coding courses with GitHub integration
            </p>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">Key Features:</h2>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Authentication with Email/Password and GitHub OAuth</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Course creation and management</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Interactive code editor with execution</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>GitHub integration for code submissions</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Real-time chat for student-instructor communication</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <span>Progress tracking and analytics</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Page Previews:</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Landing Page</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Home</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Authentication</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Sign In/Sign Up</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Dashboard</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Student Dashboard</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Course View</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Course Details</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Code Editor</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Interactive Editor</span>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 space-y-2">
                <h3 className="font-medium">Admin Panel</h3>
                <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">Admin Dashboard</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Detailed Page Previews */}
        <div className="p-8 space-y-12">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Authentication Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-2 font-medium">Sign In Page</div>
                <div className="p-4">
                  <div className="max-w-md mx-auto border rounded-lg p-6 space-y-4">
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-6 w-6 bg-primary/40 rounded-sm"></div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">Sign In</h3>
                      <p className="text-sm text-muted-foreground">Enter your credentials to access your account</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Email</div>
                        <div className="h-10 rounded-md border bg-muted/40"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <div className="text-sm font-medium">Password</div>
                          <div className="text-xs text-primary">Forgot password?</div>
                        </div>
                        <div className="h-10 rounded-md border bg-muted/40"></div>
                      </div>
                      <div className="h-10 rounded-md bg-primary"></div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t"></div>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                      </div>
                    </div>
                    
                    <div className="h-10 rounded-md border flex items-center justify-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-muted"></div>
                      <span>GitHub</span>
                    </div>
                    
                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">Don't have an account? </span>
                      <span className="text-primary">Sign Up</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-2 font-medium">Sign Up Page</div>
                <div className="p-4">
                  <div className="max-w-md mx-auto border rounded-lg p-6 space-y-4">
                    <div className="text-center space-y-2">
                      <div className="flex justify-center">
                        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="h-6 w-6 bg-primary/40 rounded-sm"></div>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold">Create an Account</h3>
                      <p className="text-sm text-muted-foreground">Enter your details to create a new account</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <div className="text-sm font-medium">First name</div>
                          <div className="h-10 rounded-md border bg-muted/40"></div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm font-medium">Last name</div>
                          <div className="h-10 rounded-md border bg-muted/40"></div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Email</div>
                        <div className="h-10 rounded-md border bg-muted/40"></div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">Password</div>
                        <div className="h-10 rounded-md border bg-muted/40"></div>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-sm font-medium">I am a</div>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="h-10 rounded-md border bg-muted/40 flex items-center justify-center">Student</div>
                          <div className="h-10 rounded-md border bg-primary/20 flex items-center justify-center">Instructor</div>
                        </div>
                      </div>
                      
                      <div className="h-10 rounded-md bg-primary"></div>
                    </div>
                    
                    <div className="text-center text-sm">
                      <span className="text-muted-foreground">Already have an account? </span>
                      <span className="text-primary">Sign In</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Student Dashboard</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-2 font-medium">Dashboard Overview</div>
              <div className="p-4">
                <div className="border rounded-lg p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">Dashboard</h3>
                      <p className="text-sm text-muted-foreground">Welcome back! Here's an overview of your learning progress.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Courses Enrolled</div>
                      <div className="text-2xl font-bold mt-1">3</div>
                      <div className="text-xs text-muted-foreground mt-1">+1 from last month</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Completed Tasks</div>
                      <div className="text-2xl font-bold mt-1">24/36</div>
                      <div className="text-xs text-muted-foreground mt-1">8 tasks completed this week</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Overall Progress</div>
                      <div className="text-2xl font-bold mt-1">68%</div>
                      <div className="text-xs text-muted-foreground mt-1">+5% from last week</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex border-b">
                      <div className="px-4 py-2 border-b-2 border-primary font-medium">Overview</div>
                      <div className="px-4 py-2 text-muted-foreground">My Courses</div>
                      <div className="px-4 py-2 text-muted-foreground">Assignments</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Learning Progress</h4>
                        <p className="text-sm text-muted-foreground">Your course completion progress over the past 6 weeks</p>
                      </div>
                      
                      <div className="h-64 mt-4 bg-muted/20 rounded-md flex items-center justify-center">
                        <div className="text-sm text-muted-foreground">Progress Chart</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Course Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-2 font-medium">Course Listing</div>
                <div className="p-4">
                  <div className="border rounded-lg p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold">Available Courses</h3>
                      <p className="text-sm text-muted-foreground">Browse and enroll in our coding courses</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted"></div>
                        <div className="p-4 space-y-2">
                          <h4 className="font-medium">Advanced JavaScript</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Master JavaScript concepts including closures, prototypes, and ES6+ features.
                          </p>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Duration:</span>
                              <span>8 weeks</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Instructor:</span>
                              <span>Jane Smith</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t p-3">
                          <div className="h-8 rounded-md bg-primary text-center text-xs flex items-center justify-center">
                            Enroll Now
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted"></div>
                        <div className="p-4 space-y-2">
                          <h4 className="font-medium">React Fundamentals</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            Learn the core concepts of React including components, state, and props.
                          </p>
                          <div className="text-xs space-y-1">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Duration:</span>
                              <span>6 weeks</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Instructor:</span>
                              <span>John Doe</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t p-3">
                          <div className="h-8 rounded-md bg-primary text-center text-xs flex items-center justify-center">
                            Enroll Now
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-primary/10 p-2 font-medium">Course Detail</div>
                <div className="p-4">
                  <div className="border rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="col-span-2">
                        <h3 className="text-xl font-bold">Advanced JavaScript</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Master JavaScript concepts including closures, prototypes, and ES6+ features.
                        </p>
                        
                        <div className="flex flex-wrap gap-3 mt-3">
                          <div className="flex items-center gap-1 text-xs">
                            <div className="h-3 w-3 rounded-full bg-muted"></div>
                            <span>8 weeks</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <div className="h-3 w-3 rounded-full bg-muted"></div>
                            <span>1243 students</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <div className="h-3 w-3 rounded-full bg-muted"></div>
                            <span>Last updated: March 10, 2025</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4">
                          <div className="h-10 w-10 rounded-full bg-muted"></div>
                          <div>
                            <div className="text-sm font-medium">Jane Smith</div>
                            <div className="text-xs text-muted-foreground">Senior JavaScript Developer</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Your progress</span>
                            <span>65%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-full rounded-full bg-primary" style={{ width: "65%" }}></div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-4">
                          <div className="h-9 px-4 rounded-md bg-primary flex items-center justify-center text-xs">
                            Continue Learning
                          </div>
                          <div className="h-9 px-4 rounded-md border flex items-center justify-center text-xs gap-1">
                            <div className="h-3 w-3 rounded-full bg-muted"></div>
                            <span>View on GitHub</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="aspect-video bg-muted"></div>
                        <div className="p-3 space-y-2">
                          <div className="text-sm font-medium">What you'll learn:</div>
                          <ul className="space-y-1">
                            <li className="flex items-center gap-1 text-xs">
                              <div className="h-3 w-3 rounded-full bg-primary/30"></div>
                              <span>Advanced JavaScript concepts</span>
                            </li>
                            <li className="flex items-center gap-1 text-xs">
                              <div className="h-3 w-3 rounded-full bg-primary/30"></div>
                              <span>Modern ES6+ features</span>
                            </li>
                            <li className="flex items-center gap-1 text-xs">
                              <div className="h-3 w-3 rounded-full bg-primary/30"></div>
                              <span>Functional programming</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex border-b">
                        <div className="px-3 py-1 border-b-2 border-primary text-sm font-medium">Curriculum</div>
                        <div className="px-3 py-1 text-sm text-muted-foreground">Resources</div>
                        <div className="px-3 py-1 text-sm text-muted-foreground">Assignments</div>
                        <div className="px-3 py-1 text-sm text-muted-foreground">Discussion</div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between border-b p-3">
                          <div className="text-sm font-medium">Module 1: JavaScript Fundamentals Review</div>
                          <div className="text-xs text-muted-foreground">3/3 completed</div>
                        </div>
                        <div className="divide-y">
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              <span className="text-sm">Variables, Scope, and Hoisting</span>
                            </div>
                            <div className="text-xs text-muted-foreground">45 mins</div>
                          </div>
                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-2 rounded-full bg-primary"></div>
                              <span className="text-sm">Functions and Execution Context</span>
                            </div>
                            <div className="text-xs text-muted-foreground">1 hour</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Code Editor</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-2 font-medium">Interactive Code Editor</div>
              <div className="p-4">
                <div className="border rounded-lg p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">Fibonacci Sequence Challenge</h3>
                    <div className="flex gap-2 mt-1">
                      <div className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">JavaScript</div>
                      <div className="text-xs border px-2 py-0.5 rounded-full">Medium</div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Task Description</h4>
                    <p className="text-sm text-muted-foreground mt-2">
                      Implement a function to calculate the nth number in the Fibonacci sequence. The Fibonacci sequence is
                      defined as: F(0) = 0, F(1) = 1, and F(n) = F(n-1) + F(n-2) for n &gt; 1.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between border-b px-4 py-2">
                          <div className="font-medium">Code</div>
                          <div className="flex items-center gap-1 text-xs">
                            <div className="h-3 w-3 rounded-full bg-muted"></div>
                            <span>Save</span>
                          </div>
                        </div>
                        <div className="bg-muted/10 p-4 font-mono text-sm h-64">
                          <div className="text-muted-foreground">
                            function fibonacci(n) {
                            <br />\
                            &nbsp;&nbsp;if (n &lt;= 1) return n;
                            <br />
                            &nbsp;&nbsp;return fibonacci(n - 1) + fibonacci(n - 2);
                            <br />
                            }
                            <br />
                            <br />
                            // Test the function
                            <br />
                            console.log(fibonacci(10));
                            <br />
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="border-b px-4 py-2 font-medium">Output</div>
                        <div className="bg-muted/10 p-4 font-mono text-sm h-32">
                          <div className="text-muted-foreground">55 // Result of fibonacci(10)</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="border-b px-4 py-2 font-medium">Hints</div>
                        <div className="p-4">
                          <div className="flex border-b">
                            <div className="px-2 py-1 text-xs border-b border-primary">Hint 1</div>
                            <div className="px-2 py-1 text-xs text-muted-foreground">Hint 2</div>
                            <div className="px-2 py-1 text-xs text-muted-foreground">Hint 3</div>
                          </div>
                          <div className="p-2 text-xs">
                            Start with the base cases: F(0) = 0 and F(1) = 1
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg overflow-hidden">
                        <div className="border-b px-4 py-2 font-medium">GitHub Integration</div>
                        <div className="p-4 space-y-3">
                          <p className="text-xs text-muted-foreground">
                            Connect your GitHub account to submit your solutions directly to your repository.
                          </p>
                          
                          <div>
                            <div className="text-xs font-medium">Repository</div>
                            <div className="flex items-center gap-1 mt-1 text-xs">
                              <div className="h-3 w-3 rounded-full bg-muted"></div>
                              <span>username/coding-challenges</span>
                            </div>
                          </div>
                          
                          <div className="border-t my-2"></div>
                          
                          <div>
                            <div className="text-xs font-medium">Commit Message</div>
                            <div className="mt-1 border rounded p-2 text-xs h-12 bg-muted/10"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <div className="h-9 px-4 rounded-md bg-primary flex items-center justify-center text-xs gap-1">
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                      <span>Run Code</span>
                    </div>
                    <div className="h-9 px-4 rounded-md border flex items-center justify-center text-xs gap-1">
                      <div className="h-3 w-3 rounded-full bg-muted"></div>
                      <span>Push to GitHub</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Admin Panel</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-2 font-medium">Admin Dashboard</div>
              <div className="p-4">
                <div className="border rounded-lg p-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Admin Dashboard</h3>
                    <p className="text-sm text-muted-foreground">Overview of your learning platform</p>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total Students</div>
                      <div className="text-2xl font-bold mt-1">1,245</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total Courses</div>
                      <div className="text-2xl font-bold mt-1">24</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Total Assignments</div>
                      <div className="text-2xl font-bold mt-1">156</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="text-sm font-medium text-muted-foreground">Recent Enrollments</div>
                      <div className="text-2xl font-bold mt-1">42</div>
                      <div className="text-xs text-muted-foreground mt-1">Last 7 days</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex border-b">
                      <div className="px-4 py-2 border-b-2 border-primary font-medium">Course Analytics</div>
                      <div className="px-4 py-2 text-muted-foreground">Assignment Analytics</div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Course Enrollments</h4>
                        <p className="text-sm text-muted-foreground">Top courses by student enrollment</p>
                      </div>
                      
                      <div className="h-64 mt-4 bg-muted/20 rounded-md flex items-center justify-center">
                        <div className="text-sm text-muted-foreground">Enrollment Chart</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold border-b pb-2">Chat Interface</h2>
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-primary/10 p-2 font-medium">Course Chat</div>
              <div className="p-4">
                <div className="border rounded-lg overflow-hidden flex flex-col h-96">
                  <div className="flex justify-between border-b p-4">
                    <div>
                      <h4 className="font-medium">Course Chat</h4>
                      <p className="text-xs text-muted-foreground">Advanced JavaScript - General Discussion</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-muted"></div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <span className="text-xs">24 online</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto p-4 space-y-4">
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0"></div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium">John Doe</span>
                          <span className="text-xs text-muted-foreground">10:30 AM</span>
                        </div>
                        <p className="text-sm mt-1">
                          Hi everyone! I'm having trouble with the Fibonacci sequence assignment. Any tips?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0"></div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium">Jane Smith</span>
                          <span className="text-xs bg-primary/20 px-2 py-0.5 rounded-full">Instructor</span>
                          <span className="text-xs text-muted-foreground">10:32 AM</span>
                        </div>
                        <p className="text-sm mt-1">
                          Hi John! The key is to think about the base cases and then build up from there. Have you tried using memoization to improve performance?
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex-shrink-0"></div>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium">Alex Johnson</span>
                          <span className="text-xs text-muted-foreground">10:35 AM</span>
                        </div>
                        <p className="text-sm mt-1">
                          I had the same issue last week. The recursive solution works but it's very slow for large values of n. I switched to an iterative approach and it was much faster.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <div className="flex-1 h-10 rounded-md border bg-muted/10"></div>
                      <div className="h-10 w-10 rounded-md bg-primary flex items-center justify-center">
                        <div className="h-4 w-4 border-t-2 border-r-2 border-white rotate-45 translate-x-[-2px]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

