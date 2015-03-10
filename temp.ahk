; All of these minus 8 hours (time for DR by default) so that on first run, all skills
; are triggered.
global last_cs_ps := UnixTimeStamp(A_NOW) - 28800 ; last clickstorm and powersurge
global last_ls_md := UnixTimeStamp(A_NOW) - 28800 ; last lucky strikes and metal detector
global last_gc_sc := UnixTimeStamp(A_NOW) - 28800 ; last golden clicks
global last_dr := UnixTimeStamp(A_NOW) - 28800    ; last dark ritual combo
global dr_stage = 3

;setmousedelay -1
;setbatchlines -1
global Count = 0
global Stop = 0

global vaagur_level = 15 ;This is the level of Vaagur, edit it to fit your own 

global HoldClicker := 0

;This function takes an input timestamp in the form YYYYMMDDHHMISS and converts
;it into a UNIX standard epoch timestamp (ie. The number of seconds since
;Jan 1, 1970). It will only work for dates from 1970 to 2400 (which is the next
;year in which the leap year rules are different).
;If you feed in an incorrectly formatted parameter the function will
;return a string detailing the error.

UnixTimeStamp(time_orig)
{
  ;Check that input parameter is correct format.
  StringLen, date_len, time_orig
  If date_len<>14
    return "The input parameter has incorrect length or is an incorrect number format."
  If time_orig is not integer
    return "The input parameter is an incorrect number format."

  ;Split date into useable parts
  StringLeft, now_year, time_orig, 4
  StringMid, now_month, time_orig, 5, 2
  StringMid, now_day, time_orig, 7, 2
  StringMid, now_hour, time_orig, 9, 2
  StringMid, now_min, time_orig, 11, 2
  StringRight, now_sec, time_orig, 2

  ;Get year seconds
  year_sec := 31536000*(now_year - 1970)

  ;Determine how many leap days
  leap_days := (now_year - 1972)/4 + 1
  Transform, leap_days, Floor, %leap_days%

  ;Determine if date is in a leap year, and if the leap day has been yet
  this_leap := now_year/4
  Transform, this_leap_round, Floor, %this_leap%
  If (this_leap = this_leap_round)
    {
    If now_month <= 2
      leap_days--   ;subtracts 1 because this year's leap day hasn't been yet
    }
  leap_sec := leap_days*86400

  ;Determine fully completed months
  If now_month = 01
    month_sec = 0
  If now_month = 02
    month_sec = 2678400
  If now_month = 03
    month_sec = 5097600
  If now_month = 04
    month_sec = 7776000
  If now_month = 05
    month_sec = 10368000
  If now_month = 06
    month_sec = 13046400
  If now_month = 07
    month_sec = 15638400
  If now_month = 08
    month_sec = 18316800
  If now_month = 09
    month_sec = 20995200
  If now_month = 10
    month_sec = 23587200
  If now_month = 11
    month_sec = 26265600
  If now_month = 12
    month_sec = 28857600

    
  ;Determine fully completed days
  day_sec := (now_day - 1)*86400

  ;Determine fully completed hours
  hour_sec := now_hour*3600 ;don't subtract 1 because it starts at 0

  ;Determine fully completed minutes
  min_sec := now_min*60

  ;Calculate total seconds
  date_sec := year_sec + month_sec + day_sec + leap_sec + hour_sec + min_sec + now_sec

  return date_sec
}

F7::
  DetectHiddenWindows, on
  SetTitleMatchMode Regex
  
  ; Grab the Clicker Heroes HWND, we'll need it later!
  ch_hwnd := WinExist("Lvl\s+\d+\s+-\s+Clicker\s+Heroes")

  ; Is Clicker Heroes even running?
  if(!ch_hwnd) {
    MsgBox, Clicker heroes is not running!
    return
  }

  ; The HWND of the browser window is great, but what we *really* want is the HWND of the flash control. 
  MouseGetPos , ch_mouse_x       ; outputvarx
              , ch_mouse_y       ; outputvary
              , ch_hwnd          ; outputvarwin - the HWND of the parent window
              , ch_control       ; outputvarcontrol - the "classNN" of literally clicker heroes
              , 2  

  ; determine if CH is active. Get the title and window class name while we're at it.
  ch_active := WinActive(ahk_id %ch_hwnd%)
  WinGetClass, ch_class, ahk_id %ch_hwnd%
  WinGetTitle, ch_title, ahk_id %ch_hwnd%
  
  ; Make sure we're actually on point.
  if(!ch_active)
  {
    MsgBox, Clicker heroes open, but is not the active window! Please click a monster and try again.
    return
  }

  ; development debug
  current_unix_time := UnixTimeStamp(A_NOW)
  OutputDebug % "CH AutoHotKey clicker initiation, current time is " . (current_unix_time)

  ; Statistical variables
  click_count := 0
  start_time := UnixTimeStamp(A_NOW)
  
  active_time := current_unix_time - 5 ; the last time the window was newly activated
  pause_clicking := 0                  ; whether or not clicking is paused
  last_pause := current_unix_time - 2  ; the last time the pause key was detected
    
  Loop {
   
    current_unix_time := UnixTimeStamp(A_NOW)

    ; Detect if we're no longer active, or if the status has changed!
    old_active := ch_active
    ch_active := WinActive(ahk_id %ch_hwnd%)
    WinGetClass, ch_class, ahk_id %ch_hwnd%
    WinGetTitle, ch_title, ahk_id %ch_hwnd%

    ; Have we gone from inactive to active?
    if (!old_active && ch_active)
    {
      active_time := current_unix_time      
    }

    ; Wait five seconds after the window has become active to start (give the user time to get the cursor in place),
    ; and only do this if CH is the active window.
    if (current_unix_time - active_time >= 5 && ch_active)
    {
      ; Click and then run the next iteration, but only if the clicking is not paused!
      if (!pause_clicking) {
        Click
        click_count++
      }
      Sleep, 20
     
    }
    
    If (GetKeyState("F8","P")=1) {
      OutputDebug % "Bailing out of Clicker Heroes AutoClick!"
      run_time := (current_unix_time - start_time)
      MsgBox % "Done with run!`n`n"
             . "Ran for " . run_time . "s, avg. clicks per second: " . Floor(click_count/run_time) 

      BREAK
    }
  }
  Return


F9::
  DetectHiddenWindows, on
  SetTitleMatchMode Regex
  
  ; Grab the Clicker Heroes HWND, we'll need it later!
  ch_hwnd := WinExist("Lvl\s+\d+\s+-\s+Clicker\s+Heroes")

  ; Is Clicker Heroes even running?
  if(!ch_hwnd) {
    MsgBox, Clicker heroes is not running!
    return
  }

  ; determine if CH is active. Get the title and window class name while we're at it.
  ch_active := WinActive(ahk_id %ch_hwnd%)
  WinGetClass, ch_class, ahk_id %ch_hwnd%
  WinGetTitle, ch_title, ahk_id %ch_hwnd%
  
  ; Make sure we're actually on point.
  if(!ch_active)
  {
    MsgBox, Clicker heroes open, but is not the active window! Please click a monster and try again.
    return
  }

  ; development debug
  current_unix_time := UnixTimeStamp(A_NOW)
  OutputDebug % "CH AutoHotKey clicker initiation, current time is " . (current_unix_time)

  dr_time := (3600000 * (1 - (vaagur_level * 0.05)))/1000 ; total cooldown for high-level power-ups (15m with vaagur maxed)
  cs_ps_time := (dr_time/6)  ; clickstorm and powersurge cool down in a sixth of the time 
  ls_md_time := (dr_time/2)  ; clickstorm and powersurge cool down in half the time
  gc_sc_time := dr_time      ; superclicks cool down in the same time as energize/reload
  
  ; Statistical variables
  cs_ps_count := 0
  ls_md_count := 0
  gc_sc_count := 0
  dr_count := 0
  click_count := 0
  start_time := UnixTimeStamp(A_NOW)
  
  active_time := current_unix_time - 5 ; the last time the window was newly activated
  pause_clicking := 0                  ; whether or not clicking is paused
  last_pause := current_unix_time - 2  ; the last time the pause key was detected
    
  Loop {
   
    current_unix_time := UnixTimeStamp(A_NOW)

    ; Detect if we're no longer active, or if the status has changed!
    old_active := ch_active
    ch_active := WinActive(ahk_id %ch_hwnd%)
    WinGetClass, ch_class, ahk_id %ch_hwnd%
    WinGetTitle, ch_title, ahk_id %ch_hwnd%

    ; Have we gone from inactive to active?
    if (!old_active && ch_active)
    {
      active_time := current_unix_time      
    }

    ; Wait five seconds after the window has become active to start (give the user time to get the cursor in place),
    ; and only do this if CH is the active window.
    if (current_unix_time - active_time >= 5 && ch_active)
    {
      ; Handle dark ritual stage combo stage 2. 
      If (dr_stage == 1 && (current_unix_time - last_dr) > dr_time)
      {
        OutputDebug, "Sending DARK RITUAL stage 2"
        Send 8
        Send 9
        last_dr := current_unix_time
        dr_stage := 0      
      }
      
      ; Handle clickstorm and powersurge. With maxed vaagur, this can happen every 2m30s. 
      If (dr_stage != 1 && (current_unix_time - last_cs_ps) > cs_ps_time)
      {
        OutputDebug, "Sending ClickStorm and PowerSurge"
        
        ; Send CS/PS combo - 1,2!
        Send 1
        Send 2
        
        last_cs_ps := current_unix_time
        cs_ps_count++
      }
      
      ; Handle lucky strikes and metal detector. With maxed vaagur, this can happen every 7m30s.
      If (dr_stage != 1 && (current_unix_time - last_ls_md) > ls_md_time)
      {
        OutputDebug, "Sending Lucky Strikes and Metal Detector"
        
        ; Send LS/MD combo - 3,4!
        Send 3
        Send 4
        
        last_ls_md := current_unix_time    
        ls_md_count++        
      }
          
      ; Handle golden clicks and super clicks. With maxed vaagur, this can happen every 15m.
      If (dr_stage != 1 && (current_unix_time - last_gc_sc) > gc_sc_time)
      {
        OutputDebug, "Sending golden clicks and super clicks"
        
        ; Send GC/SC combo - 5,7!
        Send 5
        Send 7
        
        last_gc_sc := current_unix_time
        gc_sc_count++
      }
      
      ; Handle dark ritual combo part 1. After this, no other skills can be used until dark ritual part 2 - we need
      ; to save the energize and reload for Dark Ritual.
      If ((dr_stage == 0 || dr_stage == 3) && (current_unix_time - last_dr) > dr_time)
      {
        OutputDebug, "Sending DARK RITUAL stage 1"
        
        ; Send DR combo - 8,6,9!
        Send 8
        Send 6
        Send 9
        
        last_dr := current_unix_time
        dr_stage := 1
        dr_count++
      }        
      
      ; Click and then run the next iteration, but only if the clicking is not paused!
      if (!pause_clicking) {
        Click
        click_count++
      }
      Sleep, 20
     
    }
    
    If (GetKeyState("F10","P")=1) {
      OutputDebug % "Bailing out of Clicker Heroes AutoClick!"
      run_time := (current_unix_time - start_time)
      MsgBox % "Done with run!`n`n"
             . "Ran for " . run_time . "s, avg. clicks per second: " . Floor(click_count/run_time) . "`n"
             . "`n"
             . "Total ClickStorm/PowerSurge: " . cs_ps_count . "`n"
             . "Total Lucky Strikes/Metal Detector: " . ls_md_count . "`n"
             . "Total Golden Clicks/Super Clicks: " . gc_sc_count . "`n"
             . "Total ENERGIZED DARK RITUAL uses: " . dr_count
      BREAK
    }
    
    ; Toggle the pause clicking state. We can only detect if a key is pressed, and we do that
    ; many times per second, so holding the key down for half a second (as a user would 
    ; normally do) would cause hundreds of toggles. Because of this, we only recognize it
    ; once every two seconds. We don't need to do this for F10 because it immediately
    ; breaks from our loop and thus would never trigger again.
    If (GetKeyState("F8","P")=1 && current_unix_time - last_pause > 2) {
      OutputDebug % "Pause clicking trigger!"
      pause_clicking := !pause_clicking
      last_pause := current_unix_time
    }
  }
  Return
