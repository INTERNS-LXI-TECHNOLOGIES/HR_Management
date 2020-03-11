package com.lxisoft.Appraisal.controller;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;

import java.util.HashSet;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lxisoft.Appraisal.model.Role;
import com.lxisoft.Appraisal.model.User;
import com.lxisoft.Appraisal.model.Leave;
import com.lxisoft.Appraisal.service.UserService;

@Controller
public class AppraisalController {

	@Autowired
	private UserService service;
	

	@RequestMapping("/")
	public ModelAndView home()
	{
		ModelAndView mv=new ModelAndView(); 
		String timeStand =new SimpleDateFormat ("yyyy/MM/dd").format( Calendar.getInstance().getTime());
		
		mv.addObject("date",timeStand);
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		boolean hasUserRole = authentication.getAuthorities().stream()
		          .anyMatch(r -> r.getAuthority().equals("ROLE_ADMIN"));
		if(hasUserRole)
			mv.setViewName("adminLogin");
		else mv.setViewName("redirect:/userPage");
		
		
		return  mv;
	}

	@RequestMapping("/viewUsers")
	public ModelAndView viewUsers()
	{
		ArrayList<User> user=(ArrayList<User>) service.getAllUsers();
		ModelAndView mv= new ModelAndView("viewAllUsers");
		mv.addObject("list", user);
		return mv;
	}
	@RequestMapping("/addUser")
	public String addUser(Model model) {
		model.addAttribute("newUser",new User());
		
		
		return "addUser";
	}
	
	@RequestMapping("/addU")
	public ModelAndView addUser(@ModelAttribute(value="newUser") @Valid User user,BindingResult bindingResult, HttpServletRequest request, HttpServletResponse response)
	{
		ModelAndView mv;
	
		if (bindingResult.hasErrors()) {
			mv=new ModelAndView("redirect:/addUser");}
		else {
		Role role=new Role(request.getParameter("name"));
		Set < Role > roles=new HashSet < Role >();
		roles.add(role);
		user.setRoles(roles);
		service.addUser(user);
		mv=new ModelAndView("redirect:/viewUsers");}
		return mv;
	}

	@RequestMapping("/logout-success")

	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {  
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();  
        if (auth != null){      
           new SecurityContextLogoutHandler().logout(request, response, auth);  
        }  
         return "redirect:/";  
     }  


	@RequestMapping("/userDetails") 
	 public ModelAndView userDetail(@RequestParam Long id,ModelAndView model) 
	 {
		 ModelAndView mv= new ModelAndView("userDetail"); 
		 Optional <User> user = service.findByid(id);
		 Optional<Leave> leave = service.findDate(id);
		 mv.addObject("employee",user.get());
		 if(leave.isPresent())
		 {
		 mv.addObject("leave",leave.get());
		 }
		 	return mv ;  
		 
	 }
	@RequestMapping(value = "/statusform",method = RequestMethod.GET)
	public @ResponseBody
	List<User> getName(@RequestParam("firstName") String firstName) {

		return simulateSearchResult(firstName);

	}

	private List<User> simulateSearchResult(String firstName) {

		ArrayList<User> user=(ArrayList<User>) service.getAllUsers();
		ArrayList<User> result = new ArrayList<User>();
		for (User u : user) {
			if (u.getFirstName().contains(firstName)) {
				result.add(u);
			}
		}

		return result;
	}
	@RequestMapping("/setStatus")
	public ModelAndView setStatus()
	{
		ArrayList<User> user=(ArrayList<User>) service.getAllUsers();
		ModelAndView mv= new ModelAndView("status");
		mv.addObject("list", user);
		return mv;
	}

	@RequestMapping("/sta")
	public String status(HttpServletRequest request, HttpServletResponse response)
	{
		String n=request.getParameter("leave");
		
		ArrayList<User> user=(ArrayList<User>) service.getAllUsers();
		for(int i=0;i<user.size();i++)
		{
			
			String m=user.get(i).getFirstName();
			if(n.contains(m))
			{
				String t="Authorized";
				User u=user.get(i);
				String date = "2016-08-16";
				LocalDate localDate = LocalDate.parse(date);
				service.setLeave(new Leave(localDate,t,u));
				
			}
		}
		 return "redirect:/viewUsers"; 
		
	}
}

