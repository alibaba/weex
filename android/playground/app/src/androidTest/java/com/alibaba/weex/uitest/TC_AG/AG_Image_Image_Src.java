package com.alibaba.weex.uitest.TC_AG;
import com.alibaba.weex.WXPageActivity;
import com.alibaba.weex.util.TestFlow;
import java.util.HashMap;
import org.junit.Before;
import org.junit.Test;

public class AG_Image_Image_Src extends TestFlow {
	public AG_Image_Image_Src() {
		super(WXPageActivity.class);
	}

	@Before
	public void setUp() throws InterruptedException {
		super.setUp();
		HashMap testMap = new <String, Object> HashMap();
		testMap.put("testComponet", "AG_Image");
		testMap.put("testChildCaseInit", "AG_Image_Image_Src");
		testMap.put("step1",new HashMap(){
			{
				put("click", "src0");
				put("screenshot", "AG_Image_Image_Src_01_src0");
			}
		});
		testMap.put("step2",new HashMap(){
			{
				put("click", "src1");
				put("screenshot", "AG_Image_Image_Src_02_src1");
			}
		});
		super.setTestMap(testMap);
	}

	@Test
	public void doTest(){
		super.testByTestMap();
	}

}
